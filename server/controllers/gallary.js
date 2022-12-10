import {Gallary} from "../models/gallary.js"
import {Menu} from "../models/menu.js"

import path from "path"

export const getHomeData = async(req,res)=>{
  try{
    const gallary = await Gallary.find({})
    const menu = await Menu.find({})
    res.status(200).render("home" , {title:"Forchetta" , data:{gallary , menu}})
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const home_gallary = async(req,res)=>{
  try{
    const home_gallary  = await Gallary.find({})
    res.status(200).render('home_gallary' , {data:{gallary:home_gallary}, title:'Gallary' , layout:'./layouts/main'})
  }
  catch(err){
    throw new Error(err)
  }
}


export const getGallary = async(req,res)=>{
  try{
    const gallary = await Gallary.find({})
    res.status(200).render("dashboard_items" , {title:"gallary" , data:{items:gallary}, adminName:process.env.ADMIN_NAME,
    layout:'./layouts/dashboard'})
  }  
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const addGallary = async(req,res)=>{
    const{name , desc} = req.body
    const image = req.files?.image
    if( typeof(image)==="undefined" || name==="" || desc===""){
      res.status(401)
      req.flash("error" , "Please add all fields")
      res.redirect("/dashboard/gallary/add")
    }else{
    let newImageName = Date.now() + image.name;

    let uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;

    image.mv(uploadPath, function(err){
      if(err) return res.status(500)
      console.log(err);
    })
  try{
    const newGallary = new Gallary({name , desc ,image:newImageName})
    await newGallary.save()
    res.status(200).redirect('/dashboard/gallary')
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }}
}

export const update_pageGallary =async(req,res)=>{
  try{
    const updatedGallary = await Gallary.findById(req.params.id)
    res.status(200).render("dashboard-update" , {title:"gallary" , data:{item:updatedGallary},
    layout:'./layouts/blank'})
  }
  catch(err){
    throw new Error(err)
  }
}

export const updateGallary = async(req,res)=>{
  try{
    const updatedGallary = await Gallary.findById(req.params.id)

    const{name , desc} = req.body
    const image = req.files?.image
    if( typeof(image)==="undefined" || name==="" || desc===""){
      res.status(401)
      res.status(200).render("dashboard-update" , {title:"gallary" , data:{error:"Please add all fields" ,item:{name , desc , _id:req.params.id} }, adminName:process.env.ADMIN_NAME,
      layout:'./layouts/blank'})
    }else{
    let newImageName = Date.now() + image.name;
    let uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;
    image.mv(uploadPath)
    updatedGallary.name=name
    updatedGallary.image=newImageName
    updatedGallary.desc=desc
    updatedGallary.save()
    res.redirect("/dashboard/gallary")
  }}
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const deleteGallary = async(req,res)=>{
  try{
    await Gallary.findByIdAndDelete(req.params.id)
    res.status(200).redirect("/dashboard/gallary")
    
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}