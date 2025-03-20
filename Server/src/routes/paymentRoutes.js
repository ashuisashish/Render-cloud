import express from "express";
import { createPayment, verifyPayment } from "../controllers/paymentController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post("/initiate",authenticate, createPayment);

router.post("/verify",authenticate, verifyPayment);

export default router;
