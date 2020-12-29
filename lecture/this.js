console.log(this);
console.log(this === exports);
console.log(this === module.exports);
console.log(exports === module.exports);

function a() {
  console.log(this === exports);
  console.log(this === global);
}
a();
