const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const path = require("path");
const session = require("express-session");
const nunjucks = require("nunjucks");
const dotenv = require("dotenv");
const passport = require("passport");

dotenv.config(); // 이 아래의 코드에서부터 process.env.KEY 를 사용할 수 있다.

const pageRouter = require("./routes/page");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
const { sequelize } = require("./models/index");
const passportConfig = require("./passport");

const app = express();
passportConfig(); // passport 설정
app.set("port", process.env.PORT || 8001);
// app.set(키, 값)을 사용하여 데이터를 저장할 수 있다.
// app.get(키)로 데이터를 가져올 수 있다.

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
  watch: true,
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터 베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// middleware -> app.use와 함께 사용되며 app.use(middleware)의 형식이다.
app.use(morgan("dev")); //: 요청과 응답에 대한 정보를 콘솔에 기록
app.use(express.static(path.join(__dirname, "public"))); //: 정적인 파일들을 제공
app.use("/img", express.static(path.join(__dirname, "uploads"))); // 이미지 파일 제공

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // true: qs모듈(npm패키지), false: querystring모듈
// 요청의 본문에 있는 데이터를 해석해서 req.body객체로 만들어준다.
// body-parser의 일부기능으로 최근엔 익스프레스에서 위의 기능이 내장되어 따로 설치할 필요가 없다.

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    //
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET, // 안전하게 쿠키를 전송하기위한 설정
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
// passport 미들웨어는 express-session보다 뒤에 연결
app.use(passport.initialize());
app.use(passport.session());

app.use("/", pageRouter);
app.use("/auth", authRouter);
app.use("/post", postRouter);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

// 에러처리 미들웨어는 next 인자를 쓰지 않더라도 꼭 넣어야 한다.
app.use((err, req, res, next) => {
  // 템플린 엔진에서 message, error 변수를 사용할 수 있다.
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; // -> 배포모드일 때에는 에러의 스택(상세내역) 안보여주기!
  res.status(err.status || 500);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
