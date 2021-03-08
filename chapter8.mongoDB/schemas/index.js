const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_EVN !== "production") {
    // 개발 환경일 때만 콘솔을 통해 몽구스가 생성되는 쿼리 내용을 확인
    mongoose.set("debug", true);
  }
  mongoose.connect(
    "mongodb://localhost:27017/nodejs",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

module.exports = connect;
