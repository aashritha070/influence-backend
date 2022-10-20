const router = require("express").Router();
const UserDetails = require("../models/UserDetails");
const bcrypt = require("bcrypt");


router.post("/signUp", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  try {
    
	const user = await UserDetails.findOne({ username: req.body.username }); 
	if(user){
		return res
        .status(400)
        .json({ message: "user exists" });
	}

    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new UserDetails({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
	
    });
    const userObj = await newUser.save();
    res.status(200).json(userObj);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await UserDetails.findOne({ username: req.body.username });
    if (!user)
      return res
        .status(400)
        .json({ message: "username doesnt exist!" });

    const validate = await bcrypt.compare(req.body.password, user.password);
    if (!validate)
      return res.status(400).json({
        message: "please enter valid credentials",
      });

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

module.exports = router;
