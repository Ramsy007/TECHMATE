const {  mongoose } = require("mongoose")

 const connectDb=async()=>{
    await mongoose.connect(
        "mongodb+srv://priyanshuag123:gupta123@cluster0.47vzkxo.mongodb.net/DevTinder"
    );
 };
 module.exports={connectDb}