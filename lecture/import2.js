const { odd, even } = require("./export");
const checkNum = require("./import.js");
// require로 불러오는 export, import파일을 위에서 부터 쭉 읽으면서 실행한다.
// 그리고 해당 파일에서 module exports 한 부분을 가져온다.

checkStrLength = (str) => {
  if (str.length % 2) {
    return odd;
  } else {
    return even;
  }
};

console.log(checkNum(9));
console.log(checkStrLength("HelloWorld"));
