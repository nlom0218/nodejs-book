const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { Post, Hashtag } = require("../models");
const { isLoggedIn } = require("./middlewares");
const db = require("../models");

const router = express.Router();

try {
  fs.readdirSync("./uploads"); // 여기서 경로는 npm이 실시되는 app.js기준으로 설정?
} catch (error) {
  console.error("uploads폴더가 없어 uploads 폴더를 생성합니다.");
  fs.mkdirSync("./uploads");
}

const upload = multer({
  // 업로되는 파일이 저장되는 경로와 이름 설정
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post("/img", isLoggedIn, upload.single("img"), (req, res) => {
  console.log(req.file);
  res.json({ url: `/img/${req.file.filename}` });
});

const upload2 = multer();
router.post("/", isLoggedIn, upload2.none(), async (req, res, next) => {
  try {
    const post = await Post.create({
      content: req.body.content,
      img: req.body.url,
      UserId: req.user.id,
    });
    res.redirect("/");
  } catch (error) {}
});

module.exports = router;
