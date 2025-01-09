const validator=require("validator")

 const validationvalue=(req)=>{
     const {firstName,lastName,emailId,password}=req.body;
     if(!firstName||!lastName){
         throw new Error("enter valid name")
     }
     else if(!validator.isEmail(emailId)){
         throw new Error("enter valid emailId");
     }
     else if(!validator.isStrongPassword(password)){
         throw new Error("enter strong password");
     }
    
 }
 const validateprofileedit=(req)=>{
    const allowedFields=["firstName","lastName","emailId","gender","age","about","skills","photoUrl"];
    const isallowed= Object.keys(req.body).every((field)=>allowedFields.includes(field));
    return isallowed;
 }
 module.exports= {
    validationvalue,
    validateprofileedit,

 }