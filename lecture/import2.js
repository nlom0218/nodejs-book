const { odd, even } = require("./export");
const checkNum = require("./import.js");

checkStrLength = (str) => {
  if (str.length % 2) {
    return odd;
  } else {
    return even;
  }
};

console.log(checkNum(9));
console.log(checkStrLength("HelloWorld"));
