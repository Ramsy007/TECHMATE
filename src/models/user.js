const {mongoose}=require("mongoose")
const validator=require("validator")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt");

 const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String
    },
    password:{
        type:String
    },
    emailId:{
        type:String, 
        lowercase:true,  
        required: true,
        unique:true,
        trim: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid email adress:"+value);
            }
        },
       
    },
    age:{
        type:Number
    },
    gender: {
        type: String,
        validate: {
            validator: function (value) {
                return ["male", "female", "others"].includes(value);
            },
            message: "Gender is not valid", // Error message if validation fails
        },
    },
    skills:{
        type:[String],

    },
    about:{
         type:String,
         default:"this is about section"
    }
 },{ timestamps: true });
  userSchema.methods.getJWT=async function(){
     const user=this;
     const token=jwt.sign({_id:this._id},"abcdef",{expiresIn:"7d",});
      return token;
  };
   userSchema.methods.validatepassword=async function(passwordInput){
       const user=this;
       const passwordhash=user.password;
       const ispassword= await bcrypt.compare(passwordInput,passwordhash);
       return ispassword;
        
   };


  module.exports=mongoose.model("User",userSchema)