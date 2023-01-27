const express = require("express");
const config_passport = require("../config/passport");
const passport = require("passport");

const router = express.Router();
//주의 요망 나중에 오류 발생시 이부분 재 수정 23:45 지점
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

// User Logout
router.get('/logout',(req, res) => {
  req.logout((err) => {
    if (err) { return next(err); }
    req.session.destroy();
    res.redirect('/');
  });
});

module.exports = router;
