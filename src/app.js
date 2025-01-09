const express =require("express");
const {connectDb}=require("./config/database")
const cors =require("cors")

const cookieParser = require("cookie-parser");
const authRouter = require("./Router/auth");
const profileRouter = require("./Router/profile");
const requestRouter = require("./Router/request");
const userRouter=require("./Router/user");




 const app=express();
 app.use(cors({
   origin:"http://localhost:5173",
   credentials:true,
   methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
 }));
 app.options('/login', (req, res) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.sendStatus(204); // No Content
});
 app.use(express.json());
 app.use(cookieParser())

 app.use("/",authRouter);
 app.use("/",profileRouter);
 app.use("/",requestRouter);
 app.use("/",userRouter);

 

  
  
  connectDb ()
  .then(()=>{
    console.log("database connection succesfully");
    app.listen(4000,()=>{
      console.log("server is running on  port 3000")
   })
  })
  .catch((err)=>{
   console.error("database cannot be connected!")
  });
 
 

 