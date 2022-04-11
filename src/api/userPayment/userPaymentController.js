import userModel from "../../model/payments.js";
import responses from "../../helper/responses.js";
import { handleError } from "../../helper/errorHandler.js";
import axios from "axios";
import { paystack } from "../../helper/payStack.js";
import { sendGoodwillMessage, sendThankUMail } from "../../Email/SendGrid.js";

// Paystack docs
// https://paystack.com/docs/api/#transaction

// https://paystack.zendesk.com/hc/en-us/articles/360013787840-How-do-I-switch-from-a-Registered-business-to-a-Starter-Business-

export const handleUserPayment = async (req, res) => {
  let { email, amount, fName, lName, message } = req.body;

  console.log({ email, amount, fName, lName, message });
  // amount validation
  // check for alphabet,spaces and ay kind of digit or symbol
  const amountAlpha = amount.match(/[a-zA-Z]/g);
  const amountSpace = amount.match(/\s/g);
  const amountDigit = amount.match(/\D/g);

  if (!amount || amountAlpha || amountDigit || amountSpace)
    return responses.bad_request({
      res,
      message: "The amount should only be a number",
    });

  if (amount) amount = parseInt(amount) * 100;
  try {
    const obj = { email, amount, fName, lName, message };

    // Destructuring initializePayment function and destructure data object from the response

    const { initializePayment } = paystack(obj);
    const { data } = await initializePayment(obj);

    // save user
    const user = await userModel({ email, amount, fName, lName, message });
    user.reference = data.reference;

    // send the user message to my personal email
    let fullName = `${user.fName} ${user.lName}`;
    let userEmail = user.email;
    let userMessage = user.message;

    sendGoodwillMessage(fullName, userMessage);
    await user.save();
    responses.success({
      res,
      data,
    });
  } catch (error) {
    const msg = `Could not save user credentials`;
    handleError({ error, responses, res, msg });
  }
};

export const verifyPayment = async (req, res) => {
  let { reference } = req.query;
  try {
    // Destructuring verifyPayment function
    const { verifyPayment } = paystack(reference);
    const verifyPaymentResponse = await verifyPayment(reference);
    const response = verifyPaymentResponse.data.data;

    // do this for failed transaction
    if (response.status !== "success") {
      const message = response.gateway_response;
      return responses.bad_request({ res, message });
    }

    // do this for successful transaction
    const user = await userModel.findOne({ reference });
    let fullName = `${user.fName} ${user.lName}`;
    let email = user.email;

    // send a thank you mail
    sendThankUMail(email, fullName);
    const message = response.gateway_response;

    return responses.success({
      res,
      data: response,
      message,
    });
  } catch (error) {
    console.log(error);
  }
};
