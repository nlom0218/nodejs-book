const url = require("url");

const adress =
  "http://www.gilbut.co.kr/book/bookList/aspx?sercate1=001001000&id=khd#anchor";

const { URL } = url; // URL 생성자의 구조분해할당
const myURL = new URL(adress);
// URL 생성자 안에 주소를 넣어 객체로 만드면 주소가 부분별로 정리
// 이 방식은 WHATWG의 url
console.log("new URL():", myURL);

// url.format(객체): WHATWG 방식 url과 기존 노드의 url을 모두 사용 가능. 분해되었던 url객체를 다리 원래 상태로 조립
console.log("url.format():", url.format(myURL));

// url.parse(주소): 기존 노드 방식에서의 주소 분해 방법
const parsedUrl = url.parse(adress);
console.log("url.parse()", parsedUrl);

const adress2 =
  "http://www.gitbut.co.kr/?page=3&limit=10&category=node&category=javascript";
const myURL2 = new URL(adress2);

// WHATWG 방식은 search 부분을 searchParams라는 특수한 객체로 반환한다
console.log("searchParams:", myURL2.searchParams);
// getAll(키): 키에 해당하는 모든 값을 가져옴
console.log("searchParams.getAll()", myURL2.searchParams.getAll("category"));
// get(키): 키에 해당하는 첫 번째 값만 가져옴
console.log("searchParams.get()", myURL2.searchParams.get("category"));
// has(키): 해당 키가 있는지 없는지 검사
console.log("searchParams.has()", myURL2.searchParams.has("page"));
// key(): serachParams의 모든 키를 반복기 객체로 가져옴
console.log("searchParams.keys()", myURL.searchParams.keys());
// value(): searchParams의 모든 값을 반복기 객체로 가져옴
console.log("searchParams.values()", myURL2.searchParams.values());
// append(키, 값): 해당 키를 추가, 같은 키의 값이 있다면 유지하고 하나 더 추가
myURL2.searchParams.append("filter", "es3");
myURL2.searchParams.append("filter", "es5");
console.log(myURL2.searchParams);
console.log(myURL2.searchParams.getAll("filter"));
// set(키, 값): append와 비슷하지만, 같은 키의 값들을 모두 지우고 새로 추가
myURL2.searchParams.set("filter", "es6");
console.log(myURL2.searchParams.getAll("filter"));
// delete(키): 해당 키를 제거
myURL2.searchParams.delete("filter");
console.log(myURL2.searchParams.getAll("filter"));
// toString(): 조작한 searchParams 객체를 다시 문자열로 만듬. 이 문자열을 search에 대입하면 주소 객체에 반영
console.log("myURL2.searchParams.toString():", myURL2.searchParams.toString());

// 기존 노드의 url을 사용할 때, search 부분을 사용하기 쉽게 객체로 만드는 방법
const querystring = require("querystring");
const parsedUrl2 = url.parse(adress2);
// querystring.parse(쿼리): url의 query부분을 자바스크립 객체로 분해
const query = querystring.parse(parsedUrl2.query);
console.log("querystring.parse():", query);
// querystring.stringify(객체): 분해된 query 객체를 다시 문자열로 조립
console.log("querystring.stringify():", querystring.stringify(query));
