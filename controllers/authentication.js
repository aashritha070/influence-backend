const UserDetails = require("../models/UserDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res) => {
    const salt = await bcrypt.genSalt(10);
    try {
        // Get user input
        const { firstName, lastName, emailId, password } = req.body;

        // Validate user input
        if (!(firstName && lastName && emailId && password)) 
        return res
            .status(400)
            .json({ message: "All input is required" });
        

        // Check if user already exist
        const oldUser = await UserDetails.findOne({ emailId: emailId }); 

        if (oldUser) 
        return res
            .status(409)
            .json({ message: "User Already Exist. Please Login" });

        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, salt);

        // Create user in our database
        const newUser = new UserDetails({ firstName: firstName,
                                        lastName: lastName,
                                        emailId: emailId,
                                        password: encryptedPassword,
                                        });

        const userObj = await newUser.save();

        // Create token
        const authToken = jwt.sign({ emailId: emailId },
                                '123456789',
                                {expiresIn: "2h",}
                                );
        // Sending auth token in reponse
        return res
            .status(200)
            .json({ message: "Successfully signed up !!",
                authToken: authToken });
    } 
    catch (err) {
        console.log(err);
    }
}

const loginController = async (req, res) => {
    try {
        // Validate user input
       const { emailId, password } = req.body;
   
       if (!(emailId && password))
         return res
           .status(400)
           .json({message: "All input is required"});
   
       // Validate if user exist in our database
       const user = await UserDetails.findOne({ emailId: emailId });
   
       if (!user)
         return res
           .status(400)
           .json({ message: "Enter valid credentials" });
   
       // Validate user password in our database
       const validate = await bcrypt.compare(req.body.password, user.password);
       
       if (!validate)
         return res
             .status(400)
             .json({message: "Enter valid credentials"});
   
       if (user && validate) {
         // Create token
         const authToken = jwt.sign({ emailId: emailId },
                                 '123456789',
                                 {expiresIn: "2h",}
                               );
         // Sending auth token in reponse
         return res
             .status(200)
             .json({ message: "Successfully logged in !!",
                   authToken: authToken });
       }
     } 
     catch (err) {
       console.log(err);
     }
}

module.exports = { signupController, loginController };