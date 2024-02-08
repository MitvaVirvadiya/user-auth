import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    sessionToken: {
        type: String,
        select: false
    }
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 10);
        next();
    }
})

userSchema.methods.generateSessionToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
    }, 
    process.env.SESSION_TOKEN_SECRET,
    {
        expiresIn: process.env.SESSION_TOKEN_EXPIRY
    }) 
}

export const User = mongoose.model("User", userSchema)