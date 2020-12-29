setImmediate(() => {
  console.log("immediate");
});
process.nextTick(() => {
  console.log("nextTick");
});
// 이벤트 루프가 다른 콜백 함수들보다 nextTick의 콜백함수를 우선 처리
setTimeout(() => {
  console.log("setTimeout");
}, 0);
Promise.resolve().then(() => {
  console.log("promise");
});
// process.nextTick과 Promise를 마이크로태스크라고 따로 구분지어 부름
