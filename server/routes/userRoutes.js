import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { updateUserProfile } from "../controllers/userController.js";
import userProtect from "../middleware/userAuthMiddleware.js";

const router = express.Router();

// Multer setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/userProfileImages"));
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// PUT route with authentication + image upload
router.put("/profile", userProtect, upload.single("userProfileImages"), updateUserProfile);

export default router;
