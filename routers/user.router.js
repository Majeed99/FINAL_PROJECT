const router = require("express").Router();
let users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "KDSL546H5sdfH54656G%#%$rR54756TE$%#%4%^$$235G4FDG6854";

// GET All USER DATA
router.get("/", (req, res) => {
  users
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) throw err;
    });
});

// GET USER DATA
router.get("/getUser/:id", (req, res) => {
  const id = req.params.id;
  users
    .findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      if (err) console.log(err);
    });
});

// REGISTER NEW USER
router.post("/", async (req, res) => {
  const { name, userName, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  let userNameExist = await users.findOne({ userName: userName.toLowerCase() });
  if (userNameExist) {
    res.send("userName is already used");
    return;
  }

  let emailExist = await users.findOne({ email: email.toLowerCase() });

  if (emailExist) {
    res.send("E-mail is already used");
    return;
  }

  users
    .create({
      name: name,
      userName: userName,
      email: email.toLowerCase(),
      password: passwordHash,
    })
    .then(() => {
      res.send("done");
    })
    .catch((err) => {
      if (err) res.send("email is already used");
    });
});

// CHECK USER FOR SIGN IN
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  let u = await users.findOne({ email: email.toLowerCase() }).lean();
  if (u == null) res.send("invalid email/password");
  if (await bcrypt.compare(password, u.password)) {
    console.log(u._id);
    let Token = jwt.sign(u._id.toJSON(), JWT_SECRET);
    res.cookie("jwt", Token);
    res.json(Token);
  } else res.send("invalid email/password");
});

// UPDATE USER DATA
router.put("/editProfile/:id", async (req, res) => {
  const id = req.params.id;
  const { name, location, bio, gender, avatar, header } = req.body;
  await users.findByIdAndUpdate(id, {
    name,
    location,
    bio,
    gender,
    avatar,
    header,
  });
  res.end();
});

// SIGN OUT
router.get("/signOut", async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 1 });
    // res.redirect("/");
    res.end();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
