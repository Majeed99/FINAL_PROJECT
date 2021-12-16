const router = require("express").Router();
let users = require("../models/user.model");

// GET ALL POSTS OF FRIENDS IN TIMELINE
router.get("/getPosts/:id", async (req, res) => {
  const u = await users.findById(req.params.id);
  const posts = u.posts;
  res.json(posts);
});

// ADD NEW POST TO userID
router.post("/addPost/:id", async (req, res) => {
  const id = req.params.id;
  const u = await users.findByIdAndUpdate(id, {
    $push: {
      posts: req.body,
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

router.get("/getTimeLine/:id", async (req, res) => {
  let id = req.params.id;
  const u = await users.findById(id);
  let friends = u.friends;
  friends.push(id);
  let arrPosts = friends.map(async (frId) => {
    let friendData = await users.findById(frId);
    let friendPosts = friendData.posts;
    let arrFriendPosts = await friendPosts.map((post) => {
      let userData = {
        userName: friendData.userName,
        name: friendData.name,
        _id: friendData._id,
        avatar: friendData.avatar,
      };
      let opj = { userData, post };

      return opj;
    });
    return arrFriendPosts;
  });
  Promise.all(arrPosts).then((data) => {
    let arrResults = [];
    data.forEach((arr) => {
      arr.forEach((post) => {
        arrResults.push(post);
      });
    });
    let SortedPosts = arrResults.sort(function (a, b) {
      return b.post.createdAt - a.post.createdAt;
    });
    res.json(SortedPosts);
  });
});

router.get("/getPostInfo/:userId/:postId", async (req, res) => {
  const u = await users.findById(req.params.userId);
  const postInfo = u.posts.find((e) => {
    return e._id.toString() == req.params.postId;
  });
  const result = { post: postInfo, userData: u };
  res.json(result);
});

router.post("/addComment", async (req, res) => {
  const { userId, postId, commentText, senderId } = req.body;
  const senderData = await users.findById(senderId);

  const u = await users.findById(userId);
  const postInfo = u.posts.find((e) => {
    return e._id.toString() == postId;
  });

  let commentsArray = postInfo.comments;
  commentsArray.push({
    userId: senderId,
    userName: senderData.userName,
    comment: commentText,
  });
  postInfo.comments = commentsArray;
  u.posts = postInfo;
  u.save();
  res.json(commentsArray);
});

router.delete("/DeleteComment", async (req, res) => {
  const { userId, postId, commentId } = req.body;
  console.log({ userId, postId, commentId });
  const u = await users.findById(userId);
  const postInfo = u.posts.find((e) => {
    return e._id.toString() == postId;
  });

  let commentsArray = postInfo.comments;
  commentsArray = commentsArray.filter((e) => {
    return e._id.toString() != commentId;
  });
  postInfo.comments = commentsArray;
  u.posts = postInfo;
  u.save();
  res.json(commentsArray);
});

module.exports = router;
