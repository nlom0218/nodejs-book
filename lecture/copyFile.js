const fs = require("fs").promises;

fs.copyFile("./txt/readme4.txt", "./txt/write4.txt")
  .then(() => {
    console.log("복사 완료");
  })
  .catch((err) => {
    console.error(err);
  });
