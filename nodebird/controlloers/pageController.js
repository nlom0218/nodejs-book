export const home = (req, res) => {
  const twits = [];
  res.render("main", { title: "Nodebird", twits });
};

export const profile = (req, res) => {
  res.render("profile", { title: "내 정보 - Nodebird" });
};

export const join = (req, res) => {
  res.render("join", { title: "회원가입 = Nodebird" });
};
