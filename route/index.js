const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require ("../middleware/auth");
const Story = require("../models/Story");
//주의 요망 나중에 오류 발생시 이부분 재 수정 23:45 지점

router.get("/", ensureGuest, (req, res) => {
   res.render("login", {
    layout: "login",
  }); 
});
router.get("/dashboard", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ user: req.user.id }).lean();
    res.render("dashboard", {
      name: req.user.displayName,
      stories,
    });
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});

module.exports = router;
