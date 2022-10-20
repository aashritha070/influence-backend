const router = require("express").Router();
const Tags = require("../models/tagDataModel");
const tags = require("../models/tagDataModel");

router.post("/", async (req, res) => {
  const newTag = new Tags(req.body);
  try {
    const existTag = await newTag.save();
    res.status(200).json(existTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
    try {
      const tags = await Tags.find();
      res.status(200).json(tags);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;