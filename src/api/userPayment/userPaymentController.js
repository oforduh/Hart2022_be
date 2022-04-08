import userModel from "../../model/payments.js";
import responses from "../../helper/responses.js";
import { handleError } from "../../helper/errorHandler.js";
import axios from "axios";
import { paystack } from "../../helper/payStack.js";

// Paystack docs
// https://paystack.com/docs/api/#transaction

// https://paystack.zendesk.com/hc/en-us/articles/360013787840-How-do-I-switch-from-a-Registered-business-to-a-Starter-Business-

export const handleUserPayment = async (req, res) => {
  let { email, amount, fName, lName, message } = req.body;

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
    const { initializePayment } = paystack(obj);
    const { data } = await initializePayment(obj);
    const user = await userModel({ email, amount, fName, lName, message });
    await user.save();
    responses.success({
      res,
      data,
    });
  } catch (error) {
    console.log(error);
    const msg = `Could not save user credentials`;
    handleError({ error, responses, res, msg });
  }
};

export const verifyPayment = async (req, res) => {
  let { reference } = req.query;
  try {
    const { verifyPayment } = paystack(reference);
    const verifyPaymentResponse = await verifyPayment(reference);
    const response = verifyPaymentResponse.data.data;
    if (response.status !== "success") {
      const message = response.gateway_response;
      return responses.bad_request({ res, message });
    }
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
