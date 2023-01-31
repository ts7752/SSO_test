const express = require("express");
const router = express.Router();
const { ensureAuth } = require ("../middleware/auth");
const Story = require("../models/Story");
//주의 요망 나중에 오류 발생시 이부분 재 수정 23:45 지점

// Story 추가 페이지

router.get("/add", ensureAuth, (req, res) => {
   res.render("stories/add"); 
});
//Process add form
//route POST / stories
router.post("/", ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Story.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
 });
module.exports = router;
