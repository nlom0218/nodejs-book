const fs = require("fs");

setInterval(() => {
  fs.unlink("./txt/abcdefg.txt", (err) => {
    if (err) {
      console.error(err);
    }
    console.log("삭제완료");
  });
}, 1000);
// 에러가 발생하지만 다행히 노드 내장 모듈의 에러는 실행 중인 프로세스를 멈추지 않는다.
