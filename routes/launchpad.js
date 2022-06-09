var express = require("express");
var router = express.Router();
const { getFailedLaunches } = require("../src/controllers/launchpad");

router.get("/:id", async (req, res, next) => {
    const data = await getFailedLaunches(req.params.id)
    res.json(data)
});

module.exports = router;
