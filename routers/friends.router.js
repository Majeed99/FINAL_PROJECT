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
  if (u) res.send("added");
});

router.get("/getAllRequest/:id", async (req, res) => {
  const id = req.params.id;
  const u = await users.findById(id);
  const requestsIds = u.requests;

  const usersData = await requestsIds.map(async (e) => {
    const data = await users.findById(e);
    const jsonData = await JSON.parse(JSON.stringify(data));
    return jsonData;
  });

  Promise.all(usersData).then((data) => {
    res.json(data);
  });
});

router.get("/getAllFriends/:id", async (req, res) => {
  const id = req.params.id;
  const u = await users.findById(id);
  const friendsIds = u.friends;

  const usersData = await friendsIds.map(async (e) => {
    const data = await users.findById(e);
    const jsonData = await JSON.parse(JSON.stringify(data));
    return jsonData;
  });

  Promise.all(usersData).then((data) => {
    res.json(data);
  });
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

router.delete("/unfriend", async (req, res) => {
  const { userId, friendId } = req.body;
  const u = await users.findById(friendId);
  const friends = u.friends;
  const newFriends = friends.filter((e) => {
    return e != userId;
  });
  u.friends = newFriends;
  u.save();
  // second user
  const u2 = await users.findById(userId);
  const friends2 = u2.friends;
  const newFriends2 = friends2.filter((e) => {
    return e != friendId;
  });
  u2.friends = newFriends2;
  u2.save();
  res.send("deleted");
});

router.delete("/reject", async (req, res) => {
  const { userId, friendId } = req.body;
  const u = await users.findById(userId);
  const requests = u.requests;
  const newRequests = requests.filter((e) => {
    return e != friendId;
  });
  u.requests = newRequests;
  u.save();
  res.send("deleted");
});

router.post("/accept", async (req, res) => {
  const { userId, friendId } = req.body;
  const u = await users.findById(userId);
  const requests = u.requests;
  const newRequests = requests.filter((e) => {
    return e != friendId;
  });
  u.requests = newRequests;
  u.save();
  const user = await users.findByIdAndUpdate(userId, {
    $push: {
      friends: friendId,
    },
  });
  // second user
  const u2 = await users.findById(friendId);
  const requests2 = u2.requests;
  const newRequests2 = requests2.filter((e) => {
    return e != userId;
  });
  u2.requests = newRequests2;
  u2.save();
  const user2 = await users.findByIdAndUpdate(friendId, {
    $push: {
      friends: userId,
    },
  });
  res.send("added");
});
module.exports = router;
