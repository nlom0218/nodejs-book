const http = require("http");

http
  .createServer((req, res) => {
    console.log("req.url:", req.url);
    console.log("req.headers.cookie:", req.headers.cookie);
    res.writeHead(200, { "Set-Cookie": "mycookie=test" });
    res.end("Hello Cookie");
  })
  .listen(8080, () => {
    console.log("Listening on 8080 Port 😉😀");
  });
