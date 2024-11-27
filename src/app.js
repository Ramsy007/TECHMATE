const express =require("express");
 const app=express();
  
  
//   const {adminauth} =require("./middlewares/auth");
  const {adminauth,userauth}=require("./middlewares/auth")

  app.use("/admin",adminauth);  // what happend is that whenever any api call is made on the /admin/etc then this app.use will be run and check if authorised then will move procedd further 
   app.use("/user",userauth);
  app.get("/admin/getdata",(req,res)=>{
    console.log("hiiiii")
    res.send("all data send");
  });
  
 app.get("/user",(req,res)=>{
    res.send("hii this is get call");
    // res.send("hii this is get call"); Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
 });

 app.post("/user",(req,res)=>{
    res.send("hii this is post call");
 });



 //this app.use will take all http method and return same result whatever the request you send thats why ordering matter
 app.use("/user",(req,res)=>{
    res.send("hii from server")
})

 

  app.use("/ss",(req,res)=>{
        res.send("hii from r")
  })
 

  app.listen(3000,()=>{
     console.log("server is running on  port 3000")
  })