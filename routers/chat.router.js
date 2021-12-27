const router = require("express").Router();
let users = require("../models/user.model");
const randomstring = require("randomstring");
const _ = require("lodash");

router.post("/createRoom/:userId", async (req, res) => {
  const { usersOfRoom } = req.body;
  const userId = req.params.userId;
  let u = await users.findById(userId);
  let wantedRoom;
  let Chats = u.chats;

  u.chats.forEach((room) => {
    if (_.isEqual(room.usersOfRoom, usersOfRoom)) {
      console.log(room);
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
      console.log(chats);
      chats.push(wantedRoom);
      user.chats = chats;
      user.save();
    });
    res.json(wantedRoom);
  }
  //   let reg = new RegExp(`^${userName}`, "gi");
  //   let data = await users.find({ userName: reg });
  //   if (data.length == 0) res.send("no users");
  //   else res.json(data);
});

module.exports = router;
