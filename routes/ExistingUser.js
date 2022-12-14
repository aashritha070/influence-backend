const router = require('express').Router();
const UserDetails = require('../models/UserDetails');
const Blog = require('../models/Blog');
const bcrypt = require('bcrypt');

router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        try {
            const updateChanges = await UserDetails.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            },
                {
                    new: true
                });
            res.status(200).json(updateChanges);
        } catch (err) {
            res.status(500).json(err)
        }

    }
    else {
        res.status(401).json("cannot update");
    }

});

router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await UserDetails.findById(req.params.id)

            try {
                await Blog.deleteMany({username: user.username});
                await UserDetails.findByIdAndDelete(req.params.id)
                res.status(200).json("user removed");
            } catch (err) {
                res.status(500).json(err)
            }

        } catch (err) { 
            res.status(404).json("user not found")
        }
     }
    else {
        res.status(401).json("cannot delete");
    }

});

router.get('/:id', async (req, res) => {
        try {
            const user = await UserDetails.findById(req.params.id);
            const {password, ...others} = user._doc;
            res.status(200).json(others);
        } catch (err) { 
            res.status(500).json(err)
        }
});




module.exports = router;