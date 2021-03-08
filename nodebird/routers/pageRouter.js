import express from "express";
import { isLoggedIn, isNotLoggedIn, localMiddleware } from "../middlewares";

// controllers
import {
  home,
  join,
  profile,
  searchHashtag,
} from "../controlloers/pageController";

const pageRouter = express.Router();

pageRouter.use(localMiddleware);

pageRouter.get("/", home);
pageRouter.get("/profile", isLoggedIn, profile);
pageRouter.get("/join", isNotLoggedIn, join);
pageRouter.get("/hashtag", searchHashtag);

export default pageRouter;
