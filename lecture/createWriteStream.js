const fs = require("fs");

const writeStream = fs.createWriteStream("./txt/write2.txt");
writeStream.write("이 글을 씁니다.\n");
writeStream.write("한 번 더 씁니다.");
writeStream.end();
writeStream.on("finish", () => {
  console.log("파일쓰기 완료");
  read();
});

read = () => {
  const readStream = fs.createReadStream("./txt/write2.txt", {
    highWaterMark: 8,
  });
  const data = [];
  readStream.on("data", (chunk) => {
    data.push(chunk);
    console.log(chunk);
  });
  readStream.on("end", () => {
    console.log(Buffer.concat(data).toString());
  });
  readStream.on("error", (err) => {
    console.log(err);
  });
};
