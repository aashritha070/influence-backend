const router = require("express").Router();
const { fetchAlltags } = require("../controllers/tagControllers")

router.get("/", (req, res) => fetchAlltags(req, res)); // fetch all tag

module.exports = router;