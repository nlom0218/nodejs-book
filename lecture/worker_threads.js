const { Worker, isMainThread, parentPort } = require("worker_threads");

if (isMainThread) {
  // 메인스레드
  const worker = new Worker(__filename); // 현재 파일을 워커 스레드에서 실행
  worker.on("message", (value) => console.log("form worker", value));
  worker.on("exit", () => console.log("worker exit"));
  worker.postMessage("ping"); // 워커에 ping이라는 데이터를 보냄
} else {
  // 워커스레드
  parentPort.on("message", (value) => {
    // 메인로부터 ping 메시지를 value에 받음
    console.log("from parent", value);
    parentPort.postMessage("pong"); // 메인스레드에게 pong 메세지를 보냄
    parentPort.close();
  });
}
