import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";
import morgan from "morgan";
import nunjucks from "nunjucks";
import cookieParser from "cookie-parser";
import session from "express-session";

// router 불러오기
import pageRouter from "./routers/pageRouter";

// sequelize 불러오기
import { sequelize } from "./models/index";

const app = express();

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

// routes
app.use("/", pageRouter);

app.listen("3000", () => console.log("✅Listening on : http://localhost:3000"));
