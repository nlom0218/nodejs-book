const express = require("express");

const router = express.Router();

// GET /user 라우터
router.get("/", (req, res) => {
  res.send("Hello, User");
});
router.get("/:id", (req, res) => {
  res.send(
    `req.params: ${JSON.stringify(req.params)}, req.query: ${JSON.stringify(
      req.query
    )}`
  );
  console.log("req.parms:", req.params);
  console.log("req.query:", req.query);
});

module.exports = router;
