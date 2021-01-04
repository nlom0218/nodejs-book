const fs = require("fs").promises;

setInterval(() => {
  fs.unlink("./asd.txt")
    .then(() => {
      console.log("good");
    })
    .catch((err) => {
      console.error(err);
    });
}, 1000);
// 프로미스를 사용할 때는 항상 catch를 붙이자
