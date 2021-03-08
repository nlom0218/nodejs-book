import express from "express";
import { isLoggedIn } from "../middlewares";

// Controller
import { follow } from "../controlloers/userController";

const userRouter = express.Router();

userRouter.post("/:id/follow", isLoggedIn, follow);

export default userRouter;
