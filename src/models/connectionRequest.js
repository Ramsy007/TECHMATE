const mongoose =require("mongoose");
const connectionRequestSchema=new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    ToUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
         type:String,
         enum:{
           values:["ignored","accepted","interested","rejected"],
           message:`{value} is incorrect types`
         }
       

    },



},
{timestamps:true});

connectionRequestSchema.index({fromUserId:1,ToUserId:1});
connectionRequestSchema.pre("save",function(next){
    const ConnctionRequest=this;
    if(ConnctionRequest.fromUserId.equals(ConnctionRequest.ToUserId)){
         throw new Error("cannot send request to yourself");
    }
    next();
})
module.exports=mongoose.model("connctionRequest",connectionRequestSchema)
