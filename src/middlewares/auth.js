// const adminauth=(req,res,next)=>{
//    console.log("admin auth checked")
//      const token="xyz";
//       const authoriseduser=token==="xyz";
//       if(!authoriseduser){
//          res.send("unauthorised admin user")
//       }
//       else{
//          console.log("hii my name is sachin")

//          next();
//       }
// }
  const jwt=require("jsonwebtoken");
   const User=require("../models/user")
 
const userauth= async(req,res,next)=>{
   try{
       const cookies=req.cookies;
       const {token}=cookies;
       const decodedata= await jwt.verify(token,"abcdef");
       if(!decodedata){
          throw new Error("token is not valid");
       }
       const {_id}=decodedata;
       const user=await User.findById(_id);
       req.user=user;
       next();

   }
   catch(err){
        res.send("somthing went wrong"+err.message);
   }
}
module.exports={
    userauth
}