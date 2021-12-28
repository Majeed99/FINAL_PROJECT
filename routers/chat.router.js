const router = require("express").Router();
let users = require("../models/user.model");
const randomstring = require("randomstring");
const _ = require("lodash");

router.post("/createRoom/:userId", async (req, res) => {
  const { usersOfRoom } = req.body;
  const userId = req.params.userId;
  let u = await users.findById(userId);
  let wantedRoom;

  u.chats.forEach((room) => {
    if (
      _.isEqual(room.usersOfRoom, usersOfRoom) ||
      _.isEqual(room.usersOfRoom, usersOfRoom.reverse())
    ) {
      // console.log(room);
      wantedRoom = room;
      return;
    }
  });

  if (wantedRoom) {
    res.json(wantedRoom);
  } else {
    const RoomId = randomstring.generate({
      length: 12,
      charset: "alphanumeric",
    });

    wantedRoom = { usersOfRoom: usersOfRoom, RoomId: RoomId };

    usersOfRoom.forEach(async (uId) => {
      let user = await users.findById(uId);
      let chats = user.chats;
      chats.push(wantedRoom);
      user.chats = chats;
      user.save();
    });
    res.json(wantedRoom);
  }
});

router.get("/getChats/:userId", async (req, res) => {
  const userId = req.params.userId;

  let u = await users.findById(userId);
  // res.json(u.chats);

  let arr = u.chats.map(async (e) => {
    let friends = e.usersOfRoom.filter((e) => {
      return e != userId;
    });

    let user = await users.findById(friends[0]);
    return { room: e, user: user };
  });
  Promise.all(arr).then((data) => {
    res.json(data);
  });
});

router.get("/getChatInfo/:userId/:roomId", async (req, res) => {
  const { userId, roomId } = req.params;

  let u = await users.findById(userId);
  // res.json(u.chats);

  let result = u.chats.find(async (e) => e.RoomId === roomId);
  let arr = result.usersOfRoom.filter((id) => {
    return userId != id;
  });
  let friendInfo = await users.findById(arr[0]);
  res.json({ friendInfo, result });
});

router.post("/saveMessagesList/:userId/:roomId", async (req, res) => {
  const { userId, roomId } = req.params;
  const { messageList } = req.body;

  let u = await users.findById(userId);
  let NewChatArray = await u.chats.filter(async (e) => {
    if (e.RoomId === roomId) {
      e.messagesList = messageList;
    }
    return e;
  });

  let result = u.chats.find(async (e) => e.RoomId === roomId);
  let arr = result.usersOfRoom.filter((id) => {
    return userId != id;
  });
  let friendInfo = await users.findById(arr[0]);

  let u2 = await users.findById(friendInfo._id);
  let NewChatArray2 = await u2.chats.filter(async (e) => {
    if (e.RoomId === roomId) {
      e.messagesList = messageList;
    }
    return e;
  });

  Promise.all(NewChatArray).then((data) => {
    // console.log(data);
    u.chats = data;
    u.save();
  });

  Promise.all(NewChatArray2).then((data) => {
    // console.log(data);
    u2.chats = data;
    u2.save();
    res.json(data);
  });
});
module.exports = router;
