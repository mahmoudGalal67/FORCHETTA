import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
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
  },
  category:{
    type:String,
    default:"all"
  }
},{timestamps:true})


export const Menu = new mongoose.model("MenuSchema" , menuSchema)
