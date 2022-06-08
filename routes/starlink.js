var express = require("express");
var router = express.Router();
const {getStarlink} = require("../src/controllers/starlink")

router.get("/", function (req, res, next) {
    const data = getStarlink(req.query.year, req.query.month, req.query.day)
    res.json(data)
});

module.exports = router;
