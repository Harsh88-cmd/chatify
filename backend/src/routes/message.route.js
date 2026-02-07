import express from "express";
const router = express.Router();

 router.get("/mess",(req,res)=>{
    res.send("message endpoints");
 })


export default router;