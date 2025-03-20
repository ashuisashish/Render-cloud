import { Router } from "express";
import {
  register,
  login,
  logout,
  forgotPassword,
  userProfile,
  updateUser,
  addAddress,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", authenticate, logout);

router.post("/forgot-password", authenticate, forgotPassword);

router.get("/profile", authenticate, userProfile);

router.put("/update", authenticate, updateUser);

router.post("/address", authenticate, addAddress);

export default router;
