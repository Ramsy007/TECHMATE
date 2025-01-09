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
       if (!token) {
         return res.status(401).send("Please Login!");
       }
   
      //  console.log("hii");
       const decodedata= await jwt.verify(token,"abcdef");
       console.log(decodedata);
      //  console.log("hii");
      //  if(!decodedata){
      //     return res.status(401).send("please login")
      //  }
       const {_id}=decodedata;
       const user=await User.findById(_id);
       req.user=user;
       next();

   }
   catch(err){
        res.send("somthing wenttt wrong"+err.message);
   }
}
module.exports={
    userauth
}