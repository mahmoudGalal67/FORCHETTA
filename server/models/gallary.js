import mongoose from "mongoose";

const gallarySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
  },
  image:{
    type:String,
    required:true,
  },
  desc:{ 
  type:String
  }
},{timestamps:true})


export const Gallary = new mongoose.model("GallarySchema" , gallarySchema)
