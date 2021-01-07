const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();
app.set("port", process.env.PORT || 3000);
// process.evn 객체에 PORT 속성이 있다면 그 값을 이용
// 그렇지 않으면 3000번 포트를 이용

app.use(morgan("dev")); // 요청과 응답에 대한 정보를 콘솔에 기록
app.use(express.json()); // JSON 형식의 데이터 전달
app.use(express.urlencoded({ extended: true })); // 주소 형식으로 데이터 보내는 방식
app.use(cookieParser());

app.use(
  (req, res, next) => {
    console.log("모든 요청에서 실행됩니다");
    next();
  }
  //   (req, res, next) => {
  //     throw new Error("에러 발생");
  //   }
);

app.get("/", (req, res) => {
  res.cookie("name", "KHD", {
    // 쿠키생성
    maxAge: 30000,
    httpOnly: true,
    path: "/",
  });
  res.clearCookie("name", "zerocho", {
    // 쿠키제거
    httpOnly: true,
    path: "/",
  });
  console.log("Cookies:", req.cookies);
  res.sendFile(path.join(__dirname, "index.html"));
  // res.send, res.sendFile, res.json, res.render는 한 라우터 안에서 한 번만 사용하기(미들웨어 포함)
  // 그렇지 않으면 Error: Cannot set header after they are sent to the client 발생
});
app.get("/a", (req, res) => {
  res.send("a");
});
app.get("/b", (req, res) => {
  res.send("b");
});
app.get("/c", (req, res) => {
  res.send("c");
});
app.get("/adress/:name", (req, res) => {
  res.send(`나의 주소는 ${req.params.name}입니다.`);
});

app.use((req, res, next) => {
  res.status(404).send("404 Not found");
});

app.use((err, req, res, next) => {
  //에러 미들웨어는 반드시 매개변수가 4개여야 한다
  console.error(err);
  res.status(500).send("에러났지롱, 근데 안알려주지롱ㅋㅋ");
});

app.listen(app.get("port"), () => {
  console.log(`Server start on ${app.get("port")}prot 😋`);
});
