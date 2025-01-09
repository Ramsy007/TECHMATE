const express=require("express");
const { userauth } = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User=require("../models/user");
const userRouter=express.Router();
const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

 userRouter.get("/user/requests/received",userauth,async(req,res)=>{
   try{ 
    const loggedInuser=req.user;
    //  console.log(loggedInuser);
    const requests=await connectionRequest.find({
        ToUserId:loggedInuser._id,
        status:"interested",
    }).populate("fromUserId",USER_SAFE_DATA);
    // console.log(requests);

     res.json({
        message:"data fetched successfully",
        data:requests,
     });
    }
    catch(err){
         res.status(400).send("ERROR:"+err.message);
    }


 })

 userRouter.get("/user/connections",userauth,async(req,res)=>{
    try{
        const loggedInuser=req.user;
        const connectionrequests=await connectionRequest.find({
            $or:[
                {ToUserId:loggedInuser._id,status:"accepted"},
                {fromUserId:loggedInuser._id,status:"accepted"}
            ],
        })
        .populate("fromUserId",["firstName","lastName"])
        .populate("ToUserId",["firstName","lastName"]);
        console.log(connectionrequests);
      
        const data1=connectionrequests.map((row)=>{
             if(row.fromUserId._id.toString()===loggedInuser._id.toString()){
                 return row.ToUserId
             }
             return row.fromUserId;
        })
        res.json({data1});
    }
    catch(err){
        res.status(400).send("ERROR:"+err.message);
   }
 })

 userRouter.get("/feed",userauth,async(req,res)=>{
   try{ const loggedInuser=req.user;
    const page=parseInt(req.query.page)||1;
    const limit=parseInt(req.query.limit)|| 15;
     if(limit>50){
         limit=50;
     }
     const skip=(page-1)*limit;
     const connectionrequests=await connectionRequest.find({
        $or:[{fromUserId:loggedInuser._id},
            {ToUserId:loggedInuser._id}
        ]
     }).select("fromUserId ToUserId");
     const hiddenfromfeed=new Set();
     connectionrequests.forEach((req)=>{
        hiddenfromfeed.add(req.fromUserId.toString());
        hiddenfromfeed.add(req.ToUserId.toString());

     });
     const users=await User.find({
       $and:[
        {_id:{$nin:Array.from(hiddenfromfeed)} },
        {_id:{$ne:loggedInuser._id}},
       ],
     }).select(USER_SAFE_DATA).skip(skip).limit(limit);

     res.json({data:users});
    }
     catch(err){
        res.status(400).send("ERROR:"+err.message);
   }


 })
  


module.exports=userRouter