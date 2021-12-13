const router = require("express").Router();
let users = require("../models/user.model");

router.post("/search", async (req, res) => {
  const { userName } = req.body;
  let reg = new RegExp(`^${userName}`, "gi");
  let data = await users.find({ userName: reg });
  if (data.length == 0) res.send("no users");
  else res.json(data);
});

router.post("/request", async (req, res) => {
  const { userId, friendId } = req.body;
  const u = await users.findByIdAndUpdate(friendId, {
    $push: {
      requests: userId,
    },
  });
  res.send("added");
});

router.delete("/cancel", async (req, res) => {
  const { userId, friendId } = req.body;
  const u = await users.findById(friendId);
  const requests = u.requests;
  const newRequests = requests.filter((e) => {
    return e != userId;
  });
  u.requests = newRequests;
  u.save();
  res.send("deleted");
});

module.exports = router;
