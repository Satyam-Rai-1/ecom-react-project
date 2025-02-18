const UserModel = require("../Models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const signup = async (req,res)=>{
    // console.log("req",req.body);
    
    try{
        const {name,email,password}= req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:'User is already exist, you can login',success:false});
        }
        const userModel = new UserModel({name,email,password});
        userModel.password= await bcrypt.hash(password,10);
        await userModel.save()

        res.status(201)
            .json({
                message:'Signup successfully',
                success:true,
            })
    }catch(err){
        res.status(500)
        .json({
            message:'Internal Server Error',
            success:false,
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Input validation: Ensure both email and password are provided
        if (!email || !password) {
            return res.status(400).json({
                message: 'Email and password are required',
                success: false
            });
        }

        // Check if user exists with the given email
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(403).json({
                message: 'Login failed: email or password is incorrect',
                success: false
            });
        }

        // Check if the password matches
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(403).json({
                message: 'Login failed: email or password is incorrect',
                success: false
            });
        }

        // Create a JWT token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Return success response with user data and token
        res.status(200).json({
            message: 'Login success',
            success: true,
            jwtToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            tokenExpiration: '24h'  // Optional: send token expiration duration
        });

    } catch (err) {
        console.error("Login error:", err); // Log error for debugging purposes (don't log sensitive data)
        res.status(500).json({
            message: 'Internal server error',
            success: false
        });
    }
}


module.exports = {signup,login}