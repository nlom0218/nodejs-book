const value = require("./export");
// require 함수는 선언을 하지 않았지만 노드에서 제공해주는 함수이다.

console.log(value); // {odd: "홀수입니다", even: "짝수입니다"}

const { odd, even } = value; // 구조분해할당

checkOddOrEven = (num) => {
  if (num % 2) {
    //홀수면
    return odd;
  } else {
    return even;
  }
};

console.log(checkOddOrEven(10)); // 짝수입니다

module.exports = checkOddOrEven;
// 다른 모듈을 사용하는 파일을 다시 모듈로 만들 수 있다.
// 객체만 대입하는 것이 아닌 함수와 변수도 대입 가능
