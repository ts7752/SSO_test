const express = require("express");
const router = express.Router();
const { ensureAuth } = require("../middleware/auth");
const Story = require("../models/Story");
//주의 요망 나중에 오류 발생시 이부분 재 수정 23:45 지점

// Story 추가 페이지
// GET / Stories/add
router.get("/add", ensureAuth, (req, res) => {
  res.render("stories/add");
});
//Process add form
//route POST / stories
router.post("/", ensureAuth, async (req, res) => {
  try {
    req.body.user = req.user.id;
    await Story.create(req.body);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.render("error/500");
  }
});
//Show All Stories
router.get("/", ensureAuth, async (req, res) => {
  try {
    const stories = await Story.find({ status: "public" })
      .populate("user")
      .sort({ createdAt: "desc" })
      .lean();

    res.render("stories/index", {
      stories,
    });
  } catch (error) {
    console.error(err);
    res.render("error/500");
  }
});
// Edit Page
// Get /stroies/edit/:id
router.get("/edit/:id", ensureAuth, async (req, res) => {
  const story = await Story.findOne({
    _id: req.params.id,
  }).lean();

  if (!story) {
    return res.render("error/404");
  }

  if (story.user != req.user.id) {
    res.redirect("/stories");
  }
  else{
    res.render('stories/edit', {
        story,
    })
  }
});

// Update Story
//@route PUT /stories/:id
router.put("/:id", ensureAuth, async (req, res) => {
    let story = await Story.findById(req.params.id).lean()

    if(!story){
        return res.render('error/404')
    }

    if (story.user != req.user.id) {
        res.redirect("/stories");
      }
      else{
        story = await Story.findOneAndUpdate({_id : req.params.id}, req.body, {
            new: true,
            runValidators: true,

        })

        res.redirect('/dashboard')
    }
  });
  //Proc
module.exports = router;
