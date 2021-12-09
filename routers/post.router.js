const router = require("express").Router();
let users = require("../models/user.model");

// GET ALL POSTS OF FRIENDS IN TIMELINE
router.get("/getPosts/:id", async (req, res) => {
  // console.log(req.params.id);
  const u = await users.findById(req.params.id);
  const posts = u.posts;
  console.log(posts);
  res.json(posts);
  // res.json(u.posts);
});

// ADD NEW POST TO userID
router.post("/addPost", async (req, res) => {
  const { id, text, location, locationId } = req.body;
  const u = await users.findByIdAndUpdate(id, {
    $push: {
      posts: {
        text: text,
        location: location,
        locationId: locationId,
      },
    },
  });
  res.send("added");
});

// DELETE POSTS BY userID AND postID
router.delete("/deletePost", async (req, res) => {
  const { id, postId } = req.body;
  const u = await users.findById(id);
  const posts = u.posts;
  const newPosts = posts.filter((e) => {
    return e._id != postId;
  });
  u.posts = newPosts;
  u.save();
  res.send("deleted");
});

module.exports = router;
