const express =require("express");
const {connectDb}=require("./config/database")
const User=require("./models/user")


 const app=express();
 

  app.post("/signup",async (req,res)=>{
      
      const obj={
         firstName:"harsh",
         lastName:"mishra",
         emailId:"abc@gmail.com",

      };
       const user=new User(obj); // creating a new instance of the user model
      try{
         await user.save();
         console.log("hiiii")
         res.send("user created successfully")
      }
      catch(err){
         res.status(400).send("error while saving this to db")
      }
     
  })
  
  connectDb ()
  .then(()=>{
    console.log("database connection succesfully");
    app.listen(3000,()=>{
      console.log("server is running on  port 3000")
   })
  })
  .catch((err)=>{
   console.error("database cannot be connected!")
  });
 
 

 