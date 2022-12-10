import path from "path"

import { Menu } from "../models/menu.js";


export const countMenu =async (req,res)=>{
try{
  const count = await Menu.countDocuments({})
  res.json({"count" : count})
}
catch(err){
  console.log(err);
}
}

export const filterMenu = async(req,res)=>{
  try{
    const filterMenu  = await Menu.find({})
    res.status(200).json({"data":filterMenu})
  }
  catch(err){
    throw new Error(err)
  }
}


export const home_menu = async(req,res)=>{
  try{
    const home_menu  = await Menu.find({})
    res.status(200).render('home_menu' , {data:{menu:home_menu}, title:'Menu' , layout:'./layouts/main'})
  }
  catch(err){
    throw new Error(err)
  }
}


export const getMenu = async(req,res)=>{
  try{
    const menu = await Menu.find({})
    res.status(200).render("dashboard_items" , {title:"menu" , data:{items:menu}, adminName:process.env.ADMIN_NAME,
    layout:'./layouts/dashboard'})
  }  
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const addMenu = async(req,res)=>{
    const{name , desc} = req.body
    const image = req.files?.image
    if( typeof(image)==="undefined" || name==="" || desc===""){
      res.status(401)
      req.flash("error" , "Please add all fields")
      res.redirect("/dashboard/menu/add")
    }else{
    let newImageName = Date.now() + image.name;

    let uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;

    image.mv(uploadPath, function(err){
      if(err) return res.status(500)
      console.log(err);
    })
  try{
    const newMeun = new Menu({name , desc ,image:newImageName})
    await newMeun.save()
    res.status(200).redirect('/dashboard/menu')
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }}
}

export const update_pageMenu =async(req,res)=>{
  try{
    const updatedMenu = await Menu.findById(req.params.id)
    res.status(200).render("dashboard-update" , {title:"menu" , data:{item:updatedMenu},
    layout:'./layouts/blank'})
  }
  catch(err){
    throw new Error(err)
  }
}

export const updateMenu = async(req,res)=>{
  try{
    const updatedMenu = await Menu.findById(req.params.id)

    const{name , desc} = req.body
    const image = req.files?.image
    if( typeof(image)==="undefined" || name==="" || desc===""){
      res.status(401)
      res.status(200).render("dashboard-update" , {title:"menu" , data:{error:"Please add all fields" ,item:{name , desc , _id:req.params.id} }, adminName:process.env.ADMIN_NAME,
      layout:'./layouts/blank'})
    }else{
    let newImageName = Date.now() + image.name;
    let uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;
    image.mv(uploadPath)
    updatedMenu.name=name
    updatedMenu.image=newImageName
    updatedMenu.desc=desc
    updatedMenu.save()
    res.redirect("/dashboard/menu")
  }}
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const deleteMenu = async(req,res)=>{
  try{
    await Menu.findByIdAndDelete(req.params.id)
    res.status(200).redirect("/dashboard/menu")
    
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}