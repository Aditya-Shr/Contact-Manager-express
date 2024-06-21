const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//@desc Register a user
//@route POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req,res)=>{
    const{username,email,password} =req.body;
    if(!username||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory!");
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User Already Registered");
    }

    //hashpassword
    const hashedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password:",hashedPassword);

    const user = await User.create({
        username,
        email,
        password:hashedPassword,
    });

    console.log(`User Created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,email:user.email});
    }else{
        res.status(400);
        throw new Error("User Data is not valid");
    }

    res.json({message: "Register the User"});
});


//@desc Login a user
//@route POST /api/users/login
//@access public

const loginUser = asyncHandler(async (req,res)=>{
    res.json({message: "Login User"});
});

//@desc Current user info
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler(async (req,res)=>{
    res.json({message: "Current User Information"});
});


module.exports = {registerUser,loginUser,currentUser};