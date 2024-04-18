const User = require("../models/user.model")
const { APP_SECRET } = require("../config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const SuperAdmin = require("../models/super-admin.model")

module.exports.register = async (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        // Check if super admin with the provided email already exists
        const existingUser = await SuperAdmin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "Email already exists",
                status: false
            });
        }

        // Hash the password
        const hashPassword = bcrypt.hashSync(password, 10);

        // Create a new user instance
        const newSuperAdmin = new SuperAdmin({
            fullname,
            email,
            password: hashPassword,
            role: "superadmin"
        });

        // Save the new user to the database
        const savedSuperAdmin = await newSuperAdmin.save();

        // If user is saved successfully, send success response
        if (savedSuperAdmin) {
            return res.status(201).json({
                message: "Account created successfully",
                status: true,
                role: "superadmin"
            });
        }
    } catch (error) {
        // If any error occurs during the process, send error response
        return res.status(500).json({
            message: "An error occurred",
            error: error.message,
            status: false
        });
    }
};

module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log()
        // Find the superadmin with the provided email
        const superadmin = await SuperAdmin.findOne({ email });
        
        // If user is not found, return incorrect email message
        if (!superadmin) {
            return res.status(400).json({
                message: "Incorrect email",
                status: false
            });
        }

        // Check if the provided password matches the stored password
        const isPasswordValid = await bcrypt.compare(password, superadmin.password);

        // If password is not correct, return password incorrect message
        if (!isPasswordValid) {
            return res.status(400).json({
                message: "Password is not correct",
                status: false
            });
        }

        // If email and password are correct, generate JWT token
        const token = jwt.sign({ id: superadmin._id }, APP_SECRET);

        // Send success response with token and user role
        return res.status(200).json({
            token,
            message: "Login successful",
            status: true,
            role: superadmin.role
        });
    } catch (error) {
        // If any error occurs during the process, send error response
        return res.status(500).json({
            message: "An error occurred",
            error: error.message,
            status: false
        });
    }
};

module.exports.profile = async (req, res) => {
    try {
        console.log(req.user)
        // Find the amdin based on the authenticated user ID (assuming it's available in req.user)
        const superadmin = await SuperAdmin.findOne({ _id: req.user.id });
        // If admin is not found, return 404 Not Found
        if (!superadmin) {
            return res.status(404).json({
                success: false,
                message: "super admin not found"
            });
        }

        // If user is found, return 200 OK with admin details
        return res.status(200).json({
            success: true,
            superadmin
        });
    } catch (error) {
        // If any error occurs during the process, return 500 Internal Server Error
        return res.status(500).json({
            success: false,
            message: "An error occurred",
            error: error.message
        });
    }
};



module.exports.updatePersonalDetails=(req,res)=>{
    let {fullname,email, phone}  = req.body
    User.findOneAndUpdate({_id:req.user.id},{fullname,email, phone},(err,user)=>{
        if(err){
            return res.status(400).json({
                message:"an error occured"
            })
        }
        if(!user){
            return res.status(404).json({
                message:"admin not found"
            })
        }
        if(user){
            return res.status(200).json({
                message:" details saved successfully",
                status:true
            })
        }
    })
}
module.exports.changePassword=(req,res)=>{
    let {password,newPassword} = req.body
    User.findOne({_id:req.user.id},(err,user)=>{
        if(err){
            return res.status(400).json({
                message:"an error occured"
            })
        }
        if(user){
            let isPasswordValid = bcrypt.compareSync(password, user.password)
            if(isPasswordValid){
                const salt = bcrypt.genSaltSync(10);
                let hashPassword = bcrypt.hashSync(newPassword,salt)
                user.password=hashPassword
                    user.save()
                    .then((result) => {
                        return res.status(200).json({
                            message:"password changed successfully"
                        })
                    }).catch((err) => {
                        return res.status(400).json({
                            message:"an error occured"
                        })
                    });
                
            }else{
                return res.status(400).json({
                    message:"password not correct"
                })
            }
        }
    })
}