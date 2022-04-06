import express from "express";
const router = new express.Router();

import { handleUserPayment } from "./userPaymentController.js";

router.post("/register", handleUserPayment);

export default router;
