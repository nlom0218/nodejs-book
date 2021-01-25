import User from "../models/user";
import bcrypt from "bcrypt";
import passport from "passport";

export const postJoin = async (req, res, next) => {
  console.log(email, nick, password);
  try {
    const exUser = await User.findOne({ where: { email } });
    if (exUser) {
      alert("이미 존재하는 이메일입니다.");
      return res.redirect("/join");
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      email,
      nick,
      password: hash,
    });
    return res.redirect("/");
  } catch (error) {
    console.error(error);
    return next(error);
  }
};

export const postLogin = (req, res, next) => {
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      res.send(info.message);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        res.send(info.message);
      }
      return res.redirect("/");
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect("/");
};
