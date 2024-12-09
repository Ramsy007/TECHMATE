const express =require("express");
const {connectDb}=require("./config/database")
const User=require("./models/user")

const {validationvalue}=require("./utills/validation")
 const bcrypt =require("bcrypt")
 const validator=require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userauth } = require("./middlewares/auth");
const authRouter = require("./Router/auth");
const profileRouter = require("./Router/profile");
const requestRouter = require("./Router/request");



 const app=express();
 app.use(express.json());
 app.use(cookieParser())

 app.use("/",authRouter);
 app.use("/",profileRouter);
 app.use("/",requestRouter);

 

  
  
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
 
 

 