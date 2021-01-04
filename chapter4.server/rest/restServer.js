const http = require("http");
const fs = require("fs").promises;

http
  .createServer(async (req, res) => {
    try {
      console.log(req.method, req.url);
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./rest/restFront.html");
          res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./rest/about.html");
          res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
          return res.end(data);
        }
        // 주소가 /도 /about도 아니면
        try {
          const data = await fs.readFile(`./rest${req.url}`);
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        }
        res.writeHead(404);
        return res.end("NOT FOUND");
      }
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    console.log("Listening 8080 port 😙");
  });
