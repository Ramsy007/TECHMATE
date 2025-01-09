const express=require("express");
const authRouter=express.Router();
const {validationvalue}=require("../utills/validation")
const bcrypt=require("bcrypt");
const User=require("../models/user")
const validator=require("validator");
const jwt=require("jsonwebtoken")


authRouter.post("/signup",async (req,res)=>{

    try{
          validationvalue(req);
          const {firstName,lastName,emailId,password,gender}=req.body;
          // console.log(obj);
         const passwordhash=await bcrypt.hash(password,10);
         const user=new User({
           firstName,lastName,emailId,password:passwordhash,gender
         })
     
        //  const user=new User(obj); // creating a new instance of the user model
          await user.save();
          const savedUser = await user.save();
    const token = await savedUser.getJWT();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    res.json({ message: "User Added successfully!", data: savedUser });
       }
       catch(err){
          res.status(400).send("error while saving this to db"+err.message)
       }
      
})

authRouter.post("/login",async(req,res)=>{
    try{
     const {emailId,password}=req.body;
     //  console.log(req.body);
    if(!validator.isEmail(emailId)){
      throw new Error("email not valid")
    }
    console.log(emailId);
    const user=await User.findOne({emailId:emailId});
    
    if(!user){
     throw new Error("Invalid Credentials");
    }
   //  console.log(emailId);
    const ispassword=await user.validatepassword(password);
    

    if(ispassword){
       const token=await user.getJWT();
       console.log(token);
      //  const decoded = jwt.decode(token);
      //  console.log(decoded); // This is a JSON object
       res.cookie("token",token,{expires:new Date(Date.now()+2*3600000)});
        res.send(user)
    }
    else{
       throw new Error("invalid credentials")
     
    }
    }
    catch(err){
        res.status(400).send("error while login" + err.message);
    }

 })
 authRouter.post("/logout",async(req,res)=>{
      res.cookie("token",null,
      {expires:new Date(Date.now())});
      res.send("user logout successfully");
 })
//  authRouter.post("/logout", async (req, res) => {
//    res.cookie("token", null, {
//      expires: new Date(Date.now()),
//    });
//    res.send("Logout Successful!!");
//  });






 module.exports=authRouter;