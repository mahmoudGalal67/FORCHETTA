import {Events} from "../models/events.js"

import path from "path"


export const home_events = async(req,res)=>{
  try{
    const home_events  = await Events.find({})
    res.status(200).render('home_events' , {data:{events:home_events}, title:'Events' , layout:'./layouts/main'})
  }
  catch(err){
    throw new Error(err)
  }
}

export const getEvents = async(req,res)=>{
  try{
    const events = await Events.find({})
    res.status(200).render("dashboard_items" , {title:"events" , data:{items:events}, adminName:process.env.ADMIN_NAME,
    layout:'./layouts/dashboard'})
  }  
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const addEvents = async(req,res)=>{
    const{name , desc} = req.body
    const image = req.files?.image
    if( typeof(image)==="undefined" || name==="" || desc===""){
      res.status(401)
      req.flash("error" , "Please add all fields")
      res.redirect("/dashboard/events/add")
    }else{
    let newImageName = Date.now() + image.name;

    let uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;

    image.mv(uploadPath, function(err){
      if(err) return res.status(500)
      console.log(err);
    })
  try{
    const newEvents = new Events({name , desc ,image:newImageName})
    await newEvents.save()
    res.status(200).redirect('/dashboard/events')
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }}
}

export const update_pageEvents =async(req,res)=>{
  try{
    const updatedEvents = await Events.findById(req.params.id)
    res.status(200).render("dashboard-update" , {title:"events" , data:{item:updatedEvents},
    layout:'./layouts/blank'})
  }
  catch(err){
    throw new Error(err)
  }
}

export const updateEvents = async(req,res)=>{
  try{
    const updatedEvents = await Events.findById(req.params.id)

    const{name , desc} = req.body
    const image = req.files?.image
    if( typeof(image)==="undefined" || name==="" || desc===""){
      res.status(401)
      res.status(200).render("dashboard-update" , {title:"events" , data:{error:"Please add all fields" ,item:{name , desc , _id:req.params.id} }, adminName:process.env.ADMIN_NAME,
      layout:'./layouts/blank'})
    }else{
    let newImageName = Date.now() + image.name;
    let uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;
    image.mv(uploadPath)
    updatedEvents.name=name
    updatedEvents.image=newImageName
    updatedEvents.desc=desc
    updatedEvents.save()
    res.redirect("/dashboard/events")
  }}
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const deleteEvents = async(req,res)=>{
  try{
    await Events.findByIdAndDelete(req.params.id)
    res.status(200).redirect("/dashboard/events")
    
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}