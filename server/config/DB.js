import mongoose from "mongoose";

export const connectDB =async()=>{
  try{
    await mongoose.connect(process.env.MONGOOSE_URI)
    console.log("connected to DB ⭐");
  }
  catch(err){
  console.log(err);
  process.exit(1)
  }
} 