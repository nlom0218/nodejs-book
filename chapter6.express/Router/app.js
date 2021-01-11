const express = require("express");

const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");

const app = express();

app.use("/", indexRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen("3000", () => {
  console.log("3000Port Complete");
});
