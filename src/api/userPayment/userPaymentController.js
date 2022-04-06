import userModel from "../../model/payments.js";
import responses from "../../helper/responses.js";
import { handleError } from "../../helper/errorHandler.js";

export const handleUserPayment = async (req, res) => {
  const { email, amount, fName, lName } = req.body;
  try {
    const user = new userModel({ email, amount, fName, lName });
    user.transactionReference = `Hart2022${Date.now()}`;
    await user.save();
    return responses.success({
      res,
      data: user,
    });
  } catch (error) {
    const msg = `Could not make payment`;
    handleError({ error, responses, res, msg });
  }
};
