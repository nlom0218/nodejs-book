const path = require("path");

const str = __filename;

console.log("path.sep:", path.sep); // path.sep: 경로의 구분자. 윈도는 \, POSIX(리눅스,맥)는 /
// path.delimiter: 환경 변수의 구분자
console.log("path.dirname():", path.dirname(str)); // path.dirname(경로): 파일이 위치한 폴더 경로
console.log("path.extname():", path.extname(str)); // path.extname(경로): 파일의 확장자를 보여줌
console.log("path.basename():", path.basename(str)); // path.basename(경로): 파일의 이름을 표시(확장자 포함)
console.log("path.basename - extname:", path.basename(str, path.extname(str))); // path.basename(경로, 확장자): 파일의 이름을 표시(확장자 미포함)
console.log("path.parse():", path.parse(str)); // path.parse(경로): 파일 경로를 root, dir, base, ext, name으로 분리
console.log("path.format():", path.format(path.parse(str))); // path.format(객체): patth.parse()한 객체를 파일 경로로 합침
// path.normalize(경로): /나 \를 실수로 여러 번 사용했거나 혼용했을 때 정상적인 경로로 변환
console.log("path.isAbsolute(str):", path.isAbsolute(str)); // path.isAbsolute(경로): 파일의 경로가 절대경로인지 상대경로인지를 true나 false로 알림
console.log("path.isAbsolute(./home):", path.isAbsolute("./home"));

console.log("path.relative():", path.relative(str, "c:/"));
// path.relative(기준경로, 비교경로): 경로를 두 개 넣으면 첫 번째 경로에서 두 번째 경로로 가는 방법을 알림

console.log(
  "path.join():",
  path.join(__dirname, "..", "..", "..", "..", "coding")
);
console.log(
  "path.join():",
  path.join(__dirname, "..", "..", "..", "..", "coding", "..", "/KHD")
);
// path.join(경로, ...): 여러 인수를 넣으면 하나의 경로로 합침. 상대경로인 ..(부모디렉토리)과 .(현 위치)도 알아서 처리

console.log("path.resolve():", path.resolve(__dirname, "..", "..", "/KHD"));
// path.resolve(경로, ...): path.join()과 비슷하지만 path.resolve는 /를 만나면 절대경로로 인식해서 앞의 경로를 무시함.
