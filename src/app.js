const express =require("express");
 const app=express();
  

  
 app.get("/user",(req,res)=>{
    res.send("hii this is get call");
 });

 app.post("/user",(req,res)=>{
    res.send("hii this is post call");
 });



 //this app.use will take all http method and return same result whatever the request you send 
 app.use("/user",(req,res)=>{
    res.send("hii from server")
})

 

  app.use("/ss",(req,res)=>{
        res.send("hii from r")
  })
 

  app.listen(3000,()=>{
     console.log("server is running on  port 3000")
  })