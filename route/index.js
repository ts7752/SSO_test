const express = require("express");
const router = express.Router();
//주의 요망 나중에 오류 발생시 이부분 재 수정 23:45 지점
router.get("/", (req, res) => {
  res.render("login", {
    layout: "login",
  });
});
router.get("/dashboard", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
