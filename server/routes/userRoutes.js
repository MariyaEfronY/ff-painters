import express from "express";
import { registerUser, loginUser, getMe, updateMe } from "../controllers/userController.js";
import { userProtect } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", userProtect, getMe);
router.put("/me", userProtect, updateMe);

export default router;
  