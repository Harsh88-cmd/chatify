import jwt from "jsonwebtoken";
import {ENV} from "./env.js"; 

export const generateToken = (userId , res)=>{
    const { JWT_SECRET } = ENV;
    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn: "7d",
    })

    res.cookie("jwt",token,{
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7days-in milliseconds
        httpOnly: true, //prevent xss attacks: across-site scripting
        sameSite: "strict", // CSRF attacks
        secure: ENV.NODE_ENV === "development" ? false: true,
    });

    return token; 
} 
