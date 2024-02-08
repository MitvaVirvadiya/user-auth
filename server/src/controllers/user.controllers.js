import express from 'express'
import { User } from '../models/user.models.js'
import bcrypt from 'bcrypt'

export const register = async (req, res) => {
    // email, username and password from request body
    // check fields are filled
    // check does email exist
    // check does username exist
    // hash password
    // create user
    // return user
    try {
      const { email, username, password } = req.body;
      
      if(!email || !username || !password){
        return res.status(402).json({status: 402, message: 'All fields are required'});
    }
    
    const user = await User.findOne({email})
    
    if(user){
          return res.status(402).json({status: 402, message: 'Email exists'});
    }

    const newUser = await User.create({
        email,
        name: username,
        password
    })

    return res
    .status(200)
    .json({status: 200, message: "User created successfully", data: newUser})

    } catch (error) {
        console.error("Registration Failed!!", error);
        return res.status(400).json({status: 400, message: "Registration Error: " + error});
    }
}

export const login = async (req, res) => {
    // email and password from request body
    // check fields are filled
    // check does email exist
    // check password matches
    // create sessiontoken 
    // return user
    try {
        const { email, password } = req.body

        if(!email || !password){
            return res.status(402).json({status: 402, message: 'All fields are required'});
        }

        const user = await User.findOne({email}).select("+password")

        if(!user){
            return res.status(402).json({status: 402, message: "User doesn't exist"});
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if(!isPasswordCorrect){
            return res.status(402).json({status: 402, message: "Incorrect password"});
        }

        const sessionToken =  user.generateSessionToken();
        user.sessionToken = sessionToken;
        await user.save({ validateBeforeSave: false });

        const loggedUser = await User.findById(user._id)

        return res
        .status(200)
        .cookie("sessionToken", sessionToken)
        .json({status: 200, message: "User Logged in successfully", data: loggedUser, sessionToken})
        
    } catch (error) {
        console.error("Login Failed!!", error);
        return res.status(400).json({status: 400, message: "Login Error: " + error});
    }
}

export const logout = async (req, res) => {
    // delete sessiontoken
    // return success

    try {
        await User.findByIdAndUpdate(
            req.user._id, 
            {
                $unset: {
                    sessionToken: 1
                }
            },
            {
                new: true
            }
        )

        return res
        .status(200)
        .clearCookie("sessionToken")
        .json({status: 200, message: "User Logged out successfully"})

    } catch (error) {
        console.error("Logout Failed!!", error);
        return res.status(400).json({status: 400, message: "Logout Error: " + error});
    }
}

export const getUser = async (req, res) => {
    try {
        return res
        .status(200)
        .json({status: 200, message: "User fetched successfully", user: req?.user})

    } catch (error) {
        console.error("Fetching User Failed!!", error);
        return res.status(400).json({status: 400, message: "Get User Error: " + error});
    }
}