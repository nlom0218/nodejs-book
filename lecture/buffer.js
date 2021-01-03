const str = "저를 버퍼로 바꿔 보세요";

const buffer = Buffer.from(str);
console.log("from():", buffer);
console.log("buffer.length:", buffer.length);
console.log("buffer.toString():", buffer.toString());

const array = [
  Buffer.from("띄엄 "),
  Buffer.from("띄엄 "),
  Buffer.from("띄어쓰기"),
];
const buffer2 = Buffer.concat(array);
console.log("concat():", buffer2.toString());

console.log("alloc():", Buffer.alloc(5));
