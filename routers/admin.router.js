const router = require("express").Router();
const admin = require("../models/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "KDSL546H5sdfH54656G%#%$rR54756TE$%#%4%^$$235G4FDG6854";

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  admin
    .create({
      name: name,
      email: email,
      password: passwordHash,
    })
    .then(() => {
      res.send("done");
    })
    .catch((err) => {
      if (err) res.send("email is already used");
    });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const adminUser = await admin.findOne({ email: email });
  if (adminUser == null) res.send("invalid email/password");
  else {
    if (await bcrypt.compare(password, adminUser.password)) {
      let Token = jwt.sign(adminUser._id.toJSON(), JWT_SECRET);
      res.cookie("jwtAdmin", Token);
      res.json(Token);
    } else res.send("invalid email/password");
  }
});

router.delete("/deleteUser/:id", async (req, res) => {
  const { email, password } = req.body;
  const adminUser = await admin.findOne({ email: email });
  if (adminUser == null) res.send("invalid email/password");
  else {
    if (await bcrypt.compare(password, adminUser.password)) {
      let Token = jwt.sign(adminUser._id.toJSON(), JWT_SECRET);
      res.cookie("jwtAdmin", Token);
      res.json(Token);
    } else res.send("invalid email/password");
  }
});

router.get("/signOut", async (req, res) => {
  try {
    res.cookie("jwtAdmin", "", { maxAge: 1 });
    // res.redirect("/");
    res.end();
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
