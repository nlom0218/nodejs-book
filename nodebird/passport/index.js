import passport from "passport";
import local from "./localStrategy";
import kakao from "./kakaoStrategy";
import User from "../models/user";

module.exports = () => {
  // 로그인 시 실행되며, req.session(세션) 객체에 어떤 데이터를 저장할지 정함
  passport.serializeUser((user, done) => {
    done(null, user.id); // 세션에 user.id 저장
  });

  // 매 요청 시 실행, passport.session 미들웨어가 미 메서드를 호출
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followers",
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "Followings",
        },
      ],
    })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });

  local();
  kakao();
};
