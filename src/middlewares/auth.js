const adminauth=(req,res,next)=>{
   console.log("admin auth checked")
     const token="xyz";
      const authoriseduser=token==="xyz";
      if(!authoriseduser){
         res.send("unauthorised admin user")
      }
      else{
         console.log("hii my name is sachin")

         next();
      }
}
 
const userauth=(req,res,next)=>{
   console.log("user auth checked")
     const token="xyz";
      const authoriseduser=token==="xyz";
      if(!authoriseduser){
         res.send("unauthorised  user")
      }
      else{
         console.log("hii my name is girdhar")

         next();
      }
}
module.exports={
    adminauth,userauth
}