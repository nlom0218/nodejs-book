import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { isLoggedIn } from "../middlewares";

// Controller
import { imgUpload, ContentUpload } from "../controlloers/postController";

const postRouter = express.Router();

try {
  fs.readdirSync("uploads");
} catch (error) {
  console.error("uploads 폴더가 없어 uploads 폴더를 생성합니다");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

const upload2 = multer();

postRouter.post("/img", isLoggedIn, upload.single("img"), imgUpload);
postRouter.post("/", isLoggedIn, upload2.none(), ContentUpload);

export default postRouter;
