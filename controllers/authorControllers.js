const userDataModel = require('../models/userDataModel');
const blogDataModel = require('../models/blogDataModel');
const bcrypt = require('bcrypt');

const updateUserData = async (req, res) => {
    try {
        const user = await userDataModel.find({ emailId: req.emailId })
        if (user) {
            const updateChanges = await UserDetails.findOneAndUpdate({ emailId: req.emailId }, { firstName: req.body.firstName, lastName: req.body.lastName }, { new: true })
            return res
                .status(200)
                .json({ message: "Successfully account updated" });
        }
        else {
            return res
                .status(404)
                .json({ message: "Account not found" })
        }
    }
    catch (err) {
        res.status(500).json(err)
    }

}

const deleteUserData = async (req, res) => {
    try {
        const user = await userDataModel.find({ emailId: req.emailId })

        if (user) {
            await blogDataModel.deleteMany({ emailId: req.emailId });
            await userDataModel.findByIdAndDelete(user._id)
            return res
                .status(200)
                .json({ message: "Successfully account deleted" });
        }
        else {
            return res
                .status(404)
                .json({ message: "Account not found" })
        }
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: err })
    }
}

const updateUserPassword = async (req, res) => {
    try {
        const user = await userDataModel.find({ emailId: req.emailId })
        const validate = await bcrypt.compare(req.body.password, user.password)

        if (validate) {
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);
            const updateChanges = await UserDetails.findOneAndUpdate({ emailId: req.emailId }, { password: newPassword }, { new: true })
            return res
                .status(200)
                .json({ message: "Successfully password updated" });
        }
        else {
            return res
                .status(404)
                .json({ message: "Enter valid credentials" })
        }
    }
    catch (err) {
        return res
            .status(500)
            .json({ message: err })
    }
}
module.exports = { updateUserData, deleteUserData, updateUserPassword };