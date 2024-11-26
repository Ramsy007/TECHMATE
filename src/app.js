const express =require("express");
 const app=express();

  app.use("/ss",(req,res)=>{
        res.send("hii from r")
  })


  app.listen(3000,()=>{
     console.log("server is running on  port 3000")
  })