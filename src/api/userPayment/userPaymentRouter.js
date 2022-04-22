import express from "express";
const router = new express.Router();

import {
  handleUserPayment,
  verifyPayment,
  getMessage,
} from "./userPaymentController.js";

router.post("/initialize/payment", handleUserPayment);
router.get("/verify/payment", verifyPayment);
router.post("/wallet", getMessage);

export default router;
