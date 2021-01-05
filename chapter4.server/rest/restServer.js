const http = require("http");
const fs = require("fs").promises;

const users = {};
const contents = {};

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
        } else if (req.url === "/guestBook") {
          const data = await fs.readFile("./rest/guestBook.html");
          res.writeHead(200, { "Content-type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          return res.end(JSON.stringify(users));
        } else if (req.url === "/guestBook/contents") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
          });
          return res.end(JSON.stringify(contents));
        }
        // 주소가 /도 /about도 아니면
        try {
          const data = await fs.readFile(`./rest${req.url}`);
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        }
      } else if (req.method === "POST") {
        if (req.url === "/user") {
          let body = "";
          // 요청의 body를 stream 형식으로 받음
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행된
          return req.on("end", () => {
            console.log("POST 본문(Body):", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            res.writeHead(201, { "Content-type": "text/plain; charset=utf-8" });
            res.end("등록성공");
          });
        } else if (req.url === "/guestBook/content") {
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            const { content } = JSON.parse(body);
            const id = Date.now();
            contents[id] = content;
            res.writeHead(201, { "Content-type": "text/plain; charset=utf-8" });
            res.end("등록성공");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 본문(Body)", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(201, { "Content-type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        } else if (req.url.startsWith("/guestBook/content/")) {
          const key = req.url.split("/")[3];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            contents[key] = JSON.parse(body).content;
            res.writeHead(201, { "Content-type": "text/plain; charset=utf-8" });
            return res.end(JSON.stringify(users));
          });
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(201, { "Content-type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        } else if (req.url.startsWith("/guestBook/content/")) {
          const key = req.url.split("/")[3];
          delete contents[key];
          res.writeHead(201, { "Content-type": "text/plain; charset=utf-8" });
          return res.end(JSON.stringify(users));
        }
      }
      res.writeHead(404);
      return res.end("NOT FOUND");
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end(err.message);
    }
  })
  .listen(8080, () => {
    console.log("Listening 8080 port 😙");
  });
