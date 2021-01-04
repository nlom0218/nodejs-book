const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
  res.write("<h1>Hello World</h1>");
  res.end("<h2>Hello Serer</p>");
});

server.listen(8080);

server.on("listening", () => {
  console.log("정상 작동합니다");
});
server.on("error", (err) => {
  console.error(err);
});
