import express from "express";
import jwt from 'jsonwebtoken'
import { User } from "../models/user.models.js";

export const isVerified = async (req, res, next) => {
    try {
        const sessionToken = req.cookies?.sessionToken;
        console.log(req.cookies);
        
        if(!sessionToken){
            return res.status(400).json({status: 400, message: "unauthorized request"});
        }
        
        const decodedToken = jwt.verify(sessionToken, process.env.SESSION_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)

        if(!user){
            return res.status(400).json({status: 400, message: "Session expired. Please login again"});
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Invalid Session token" || error?.message);
        return res.status(400).json({ status: 400, message: "Invalid Session token" });
    }   
}