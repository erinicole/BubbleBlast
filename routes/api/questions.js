const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => {
  res.json({
    msg: "Test message MERN"
  });
});

module.exports = router;