helloWorld = () => {
  console.log("Hello World");
  helloNode();
};

helloNode = () => {
  console.log("Hello node");
};

helloWorld();

// cmd에서 위의 함수를 실행시키기 위해
// cd명령어를 사용하여 폴더 위치를 변경하고
// node 파일경로를 입력하여 실행한다.
// 위의 예제에서는 node helloWorld 입력
// => 노드야 helloWorld.js파일을 실행시켜줘
// vscode에서는 Ctrl + `를 누르면 바로 cmd를 사용할 수 있다.
