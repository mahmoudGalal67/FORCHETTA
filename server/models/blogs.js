import mongoose from "mongoose";

const blogsSchema = new mongoose.Schema({
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


export const Blogs = new mongoose.model("BlogsSchema" , blogsSchema)
