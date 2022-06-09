var express = require("express");
var router = express.Router();
const { getStarlink } = require("../src/controllers/starlink");

router.get("/", function (req, res, next) {
  const year = req.query.year ? parseInt(req.query.year) : 0;
  const month = req.query.month ? parseInt(req.query.month) : 0;
  const day = req.query.day ? parseInt(req.query.day) : 0;
  const data = getStarlink(year, month, day);
  res.json(data);
});

module.exports = router;
