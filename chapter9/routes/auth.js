const express = require("express");
const passport = require("passport");
const bcrypt = require("bcrypt");
const { isNotLoggedIn, isLoggedIn } = require("./middlewares");
const User = require("../models/user");

const router = express.Router();

// 회원가입 라우터
router.post("/join", isNotLoggedIn, async (req, res, next) => {
  const { email, nick, password } = req.body;
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      return res.redirect("/join?error=exist");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

// 로그인 라우터
// passport/localStrategy와 함께 보며 흐름 생각하기
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

// 로그아웃 라우터
router.get("/logout", isLoggedIn, (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
});

// 카카오 로그인

router.get("/kakao", passport.authenticate("kakao")); // 카카오 로그인 창으로 리다이렉트
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureFlash: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
