import userModel from "../../model/payments.js";
import responses from "../../helper/responses.js";
import { handleError } from "../../helper/errorHandler.js";
import axios from "axios";
import { paystack } from "../../helper/payStack.js";

// Paystack docs
// https://paystack.com/docs/api/#transaction

// https://paystack.zendesk.com/hc/en-us/articles/360013787840-How-do-I-switch-from-a-Registered-business-to-a-Starter-Business-
export const handleUserPayment = async (req, res) => {
  let { email, amount, fName, lName } = req.body;
  if (amount) amount = parseInt(amount) * 100;
  try {
    const obj = { email, amount, fName, lName };
    const { initializePayment, verifyPayment } = paystack(obj);
    const data = await initializePayment(obj);
    console.log(data);
    const ref = data.reference;

    const verifyPaymentData = await verifyPayment(ref);
    if (verifyPaymentData.status) {
      console.log(verifyPaymentData.gateway_response);
    }
    // Send a POST request
    // const host = `https://api.paystack.co`;
    // const path = `/transaction/initialize`;
    // const url = `${host}${path}`;
    // const config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.MySecretKey}`,
    //   },
    // };

    // const { data } = await axios.post(url, obj, config);
    return;
    responses.success({
      res,
      data,
    });
  } catch (error) {
    console.log(error);
  }
};
