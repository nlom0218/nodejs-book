const fs = require("fs").promises;

fs.writeFile("./txt/write.txt", "파일이 생성되고 글이 입력됩니다")
  .then(() => {
    return fs.readFile("./txt/write.txt");
  })
  .then((data) => {
    console.log(data.toString());
  })
  .catch((err) => console.log("err는:", err));
