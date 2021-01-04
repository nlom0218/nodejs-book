const { readSync } = require("fs");
const http = require("http");

http
  .createServer((req, res) => {
    res.write("<h1>Hello World</h1>");
    res.end("<h2>Hello Serer</p>");
  })
  .listen(8080, () => {
    console.log("정상 작동합니다");
  });
