process.on("uncaughtException", (err) => {
  console.error("예기치 못한 에러", err);
});

setInterval(() => {
  throw new Error("에러 발생!");
}, 1000);

setTimeout(() => {
  console.log("에러가 발생되어도 노드는 실행됩니다");
}, 2000);
