import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema({
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


export const Events = new mongoose.model("EventsSchema" , eventsSchema)
