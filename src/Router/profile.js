 const express=require("express");
 const {userauth}=require("../middlewares/auth")
 const {validateprofileedit}=require("../utills/validation");
  const profileRouter=express.Router();
 
  profileRouter.get("/profile/view",userauth,async(req,res)=>{
    try{
       const user=req.user;
         
      res.send(user);
    }
    catch(err){
     res.send("error while login" + err.message);
 }
 })
 profileRouter.patch("/profile/edit",userauth,async(req,res)=>{
    try{
        if(!validateprofileedit(req)){
             throw new  Error("only mandatory fields are editable")
        }
        const loggedInuser=req.user;
        Object.keys(req.body).forEach((key)=>(loggedInuser[key]=(req.body[key])))
        loggedInuser.save();
        res.send("user updated successfully")
       

    }
    catch(err){
     res.send("error while login" + err.message);
 }
 })

 module.exports=profileRouter


