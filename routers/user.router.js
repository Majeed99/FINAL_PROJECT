const router = require("express").Router();
let users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const JWT_SECRET = "KDSL546H5sdfH54656G%#%$rR54756TE$%#%4%^$$235G4FDG6854";

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
router.post("/", async (req, res) => {
  const { name, email, password } = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  users
    .create({ name: name, email: email, password: passwordHash })
    .then(() => {
      res.send("done");
    })
    .catch((err) => {
      if (err) res.send("Email is used");
    });
});
router.post("/signIn", async (req, res) => {
  const { email, password } = req.body;
  let u = await users.findOne({ email: email }).lean();
  if (u == null) res.send("invalid email/password");
  if (await bcrypt.compare(password, u.password)) {
    let Token = jwt.sign(u, JWT_SECRET);
    res.cookie("jwt", Token);
    res.json(Token);
  } else res.send("invalid email/password");
});

module.exports = router;
