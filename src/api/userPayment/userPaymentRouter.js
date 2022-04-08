import express from "express";
const router = new express.Router();

import {
  handleUserPayment,
  handleUserPayment2,
} from "./userPaymentController.js";

router.post("/initialize/payment", handleUserPayment);
router.post("/", handleUserPayment2);

export default router;
