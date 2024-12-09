const express=require("express");
const {userauth}=require("../middlewares/auth")

const requestRouter=express.Router();

requestRouter.get("/sendConnectionRequest",userauth,(req,res)=>{
    const user=req.user;
    console.log(req.user);
    res.send( user.firstName+"conncetion request send successfully");
})

module.exports=requestRouter