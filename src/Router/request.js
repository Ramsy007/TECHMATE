const express=require("express");
const {userauth}=require("../middlewares/auth");
// const connctionRequest = require("../models/connectionRequest");
const connctionRequest=require("../models/connectionRequest")
const User=require("../models/user");


const requestRouter=express.Router();

requestRouter.post("/request/send/:status/:toUserId",userauth,async(req,res)=>{
 try{
    const fromUserId=req.user._id;
    const ToUserId=req.params.toUserId;
    const status=req.params.status;
    // console.log(fromUserId);
   
    const allowed=["interested","ignored"];
     if(!allowed.includes(status)){
         throw new Error("not the correct field")
     }
     const toUser=await User.findById(ToUserId);
     if(!toUser){
         return res.status(404).json({message:"user not found"});
     }
    
      const existingConnctionRequest=await connctionRequest.findOne({
        $or:[
            {fromUserId,ToUserId},
            {fromUserId:ToUserId,ToUserId:fromUserId},
        ],
      });
      if(existingConnctionRequest){
          return res.status(404).send({message:"connction request already  exist"});
      }
      console.log(ToUserId);
      const ConnctionRequest=new connctionRequest({
         fromUserId,
         ToUserId,
         status,
      });
     
      const data=await ConnctionRequest.save();
    //   console.log(1);
     
      
      res.json({ 
         message: req.user.firstName +" connction requset send sucessfuly to "+ toUser.firstName,
         data,
      })
 }
 catch(err){
    res.status(400).send("error"+err.message)
 }

})
requestRouter.post("/request/review/:status/:requestId",userauth,async(req,res)=>{
   try{ 
    const loggedInuser=req.user;
    const {status,requestId}=req.params;
    const allowedStatus=["accepted","rejected"];
   
    if(!allowedStatus.includes(status)){ 
        return res.status(404).json({message:"status not allowed!"});
    }
    //  console.log(requestId);
    //  console.log(loggedInuser._id);
    const ConnectionRequest=await connctionRequest.findOne({
        _id:requestId,
        ToUserId:loggedInuser._id,
        status:"interested"
        
    });
    console.log(ConnectionRequest);
    if(!ConnectionRequest){
        return res.status(404).json({message:"connection request not found"});

    }
     
    ConnectionRequest.status=status;
    const data=await ConnectionRequest.save();
    res.json({message:"connection request"+status,data});
}
catch(err){
     res.status(400).send("Error:"+err.message);
}


})


module.exports=requestRouter