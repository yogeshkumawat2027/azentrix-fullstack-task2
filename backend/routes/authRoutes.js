import express from "express";

import auth from "../middlewares/authMiddleware.js";
import {registerUser,loginUser,logoutUser ,getMe, updateProfile} from "../controllers/authController.js";
  
  
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/me", auth, getMe);
router.patch("/profile", auth, updateProfile);

export default router;
