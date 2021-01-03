const fs = require("fs").promises;

fs.readFile("./txt/readme.txt") // 파일 읽기
  .then((data) => {
    console.log(data);
    console.log(data.toString());
  })
  .catch((err) => console.log(err));
