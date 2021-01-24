import express from "express";

// controllers
import { home, join, profile } from "../controlloers/pageController";

const pageRouter = express.Router();

pageRouter.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

pageRouter.get("/", home);
pageRouter.get("/profile", profile);
pageRouter.get("/join", join);

export default pageRouter;
