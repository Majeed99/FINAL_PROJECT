const router = require("express").Router();
let users = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRT = "KDSL546H5sdfH54656G%#%$rR54756TE$%#%4%^$$235G4FDG6854";

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
router.post("/", (req, res) => {
  users
    .create(req.body)
    .then(() => {
      res.send("done");
    })
    .catch((err) => {
      if (err) res.send("Email is used");
    });
});

module.exports = router;
