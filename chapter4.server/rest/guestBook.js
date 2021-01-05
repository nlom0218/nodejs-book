async function getGuestBook() {
  // 로딩 시 사용자 정보를 가져오는 함수
  try {
    const res = await axios.get("/guestBook/contents");
    const contents = res.data;
    const list = document.getElementById("list");
    list.innerHTML = "";
    // 사용자마다 반복적으로 화면 표시 및 이벤트 연결
    Object.keys(contents).map(function (key) {
      const userDiv = document.createElement("div");
      const span = document.createElement("span");
      span.textContent = contents[key];
      const edit = document.createElement("button");
      edit.textContent = "수정";
      edit.addEventListener("click", async () => {
        // 수정 버튼 클릭
        const content = prompt("바꿀 내용을 입력하세요!");
        if (!content) {
          return alert("내용을 반드시 입력하셔야 합니다");
        }
        try {
          await axios.put("/guestBook/content/" + key, { content });
          getGuestBook();
        } catch (err) {
          console.error(err);
        }
      });
      const remove = document.createElement("button");
      remove.textContent = "삭제";
      remove.addEventListener("click", async () => {
        // 삭제 버튼 클릭
        try {
          await axios.delete("/guestBook/content/" + key);
          getGuestBook();
        } catch (err) {
          console.error(err);
        }
      });
      userDiv.appendChild(span);
      userDiv.appendChild(edit);
      userDiv.appendChild(remove);
      list.appendChild(userDiv);
    });
  } catch (err) {
    console.error(err);
  }
}

window.onload = getGuestBook; // 화면 로딩 시 getUser 호출
// 폼 제출(submit) 시 실행
document.getElementById("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const content = e.target.guestBook.value;
  if (!content) {
    return alert("내용을 입력하세요");
  }
  try {
    await axios.post("/guestBook/content", { content });
    getGuestBook();
  } catch (err) {
    console.error(err);
  }
  e.target.guestBook.value = "";
});
