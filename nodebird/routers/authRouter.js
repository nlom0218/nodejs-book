import express from "express";
import passport from "passport";
import { isLoggedIn, isNotLoggedIn, localMiddleware } from "../middlewares";

// controllers
import { logout, postJoin, postLogin } from "../controlloers/authController";

const authRouter = express.Router();

authRouter.post("/join", postJoin);
authRouter.post("/login", postLogin);
authRouter.get("/logout", logout);

// kakao login
authRouter.get("/kakao", passport.authenticate("kakao"));
authRouter.get(
  "/kakao/callback",
  passport.authenticate("kakao", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

export default authRouter;
