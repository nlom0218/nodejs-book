import express from "express";
import { isLoggedIn, isNotLoggedIn, localMiddleware } from "../middlewares";

// controllers
import { logout, postJoin, postLogin } from "../controlloers/authController";

const authRouter = express.Router();

authRouter.post("/join", postJoin);
authRouter.post("/login", postLogin);
authRouter.get("/logout", logout);

export default authRouter;
