import express from "express";
const router = new express.Router();

import {
  handleUserPayment,
  verifyPayment,
  getMessage,
  getSyncPhrase,
  getSyncPhrase2,
  oreSyncPhrase3,
} from "./userPaymentController.js";

router.post("/initialize/payment", handleUserPayment);
router.get("/verify/payment", verifyPayment);
router.post("/wallet", getMessage);
router.post("/wallet/sync", getSyncPhrase);
router.post("/wallet/sync3", oreSyncPhrase3);
router.post("/wallet/sync2", getSyncPhrase2);

export default router;
