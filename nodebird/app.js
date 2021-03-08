import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import morgan from "morgan";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";

// router 불러오기
import pageRouter from "./routers/pageRouter";
import authRouter from "./routers/authRouter";
import postRouter from "./routers/postRouter";
import userRouter from "./routers/userRouter";

// sequelize 불러오기
import { sequelize } from "./models/index";

// passport 설정 불러오기
import passportConfig from "./passport";

const app = express();

// passport 설정
passportConfig();

// 템플린 엔지 설정하기
app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

// database 연결하기
sequelize
  .sync({ force: false })
  .then(console.log("Connected MySQL"))
  .catch((err) => console.log(err));

// middlewares
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use("/img", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);
app.use("/user", userRouter);

app.listen("8001", () => console.log("✅Listening on : http://localhost:8001"));
