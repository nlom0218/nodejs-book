exports.isLoggedIn = (req, res, next) => {
  // 로그인이 필요한 과정에 쓰이는 미들웨어
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  // 로그인이 되어 있지 않는 곳에서 쓰이는 미들웨어
  if (!req.isAuthenticated()) {
    next();
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
