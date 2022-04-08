import express from "express";
const router = new express.Router();

import { handleUserPayment, verifyPayment } from "./userPaymentController.js";

router.post("/initialize/payment", handleUserPayment);
router.get("/verify/payment", verifyPayment);

export default router;
