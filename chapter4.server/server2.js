const http = require("http");
const fs = require("fs").promises;

// http // promise then catch 사용
//   .createServer((req, res) => {
//     fs.readFile("./server2.html").then((data) => {
//       res.end(data).catch((err) => {
//         console.error(err);
//       });
//     });
//   })
//   .listen(8080, () => {
//     console.log("Listening8080😀");
//   });

http
  .createServer(async (req, res) => {
    try {
      const data = await fs.readFile("./server2.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(data);
    } catch (err) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      console.error(err);
    }
  })
  .listen(8080, () => {
    console.log("Listening8080🤗");
  });
