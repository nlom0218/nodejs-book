const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");

const User = require("../models/user");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findOne({
      where: { id },
      include: [
        { model: User, attributes: ["id", "nick"], as: "Followers" },
        { model: User, attributes: ["id", "nick"], as: "Following" },
      ],
    })
      .then((user) => done(null, user)) // => req.user가 생성된다
      .catch((err) => done(err));
  });

  local();
  kakao();
};
