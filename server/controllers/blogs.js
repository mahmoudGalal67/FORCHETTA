import path from "path"

import {Blogs} from "../models/blogs.js"


export const home_blogs = async(req,res)=>{
  try{
    const home_blogs  = await Blogs.find({})
    res.status(200).render('home_blogs' , {data:{blogs:home_blogs}, title:'Blogs' , layout:'./layouts/main'})
  }
  catch(err){
    throw new Error(err)
  }
}


export const getBlogs = async(req,res)=>{
  try{
    const blogs = await Blogs.find({})
    res.status(200).render("dashboard_items" , {title:"blogs" , data:{items:blogs}, adminName:process.env.ADMIN_NAME,
    layout:'./layouts/dashboard'})
  }  
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const addBlogs = async(req,res)=>{
    const{name , desc} = req.body
    const image = req.files?.image
    if( typeof(image)==="undefined" || name==="" || desc===""){
      res.status(401)
      req.flash("error" , "Please add all fields")
      res.redirect("/dashboard/blogs/add")
    }else{
    let newImageName = Date.now() + image.name;

    let uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;

    image.mv(uploadPath, function(err){
      if(err) return res.status(500)
      console.log(err);
    })
  try{
    const newBlogs = new Blogs({name , desc ,image:newImageName})
    await newBlogs.save()
    res.status(200).redirect('/dashboard/blogs')
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }}
}

export const update_pageBlogs =async(req,res)=>{
  try{
    const updatedBlogs = await Blogs.findById(req.params.id)
    res.status(200).render("dashboard-update" , {title:"blogs" , data:{item:updatedBlogs},
    layout:'./layouts/blank'})
  }
  catch(err){
    throw new Error(err)
  }
}

export const updateBlogs = async(req,res)=>{
  try{
    const updatedBlogs = await Blogs.findById(req.params.id)

    const{name , desc} = req.body
    const image = req.files?.image
    if( typeof(image)==="undefined" || name==="" || desc===""){
      res.status(401)
      res.status(200).render("dashboard-update" , {title:"blogs" , data:{error:"Please add all fields" ,item:{name , desc , _id:req.params.id} }, adminName:process.env.ADMIN_NAME,
      layout:'./layouts/blank'})
    }else{
    let newImageName = Date.now() + image.name;
    let uploadPath = path.resolve('./') + '/public/uploads/' + newImageName;
    image.mv(uploadPath)
    updatedBlogs.name=name
    updatedBlogs.image=newImageName
    updatedBlogs.desc=desc
    updatedBlogs.save()
    res.redirect("/dashboard/blogs")
  }}
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}

export const deleteBlogs = async(req,res)=>{
  try{
    await Blogs.findByIdAndDelete(req.params.id)
    res.status(200).redirect("/dashboard/blogs")
    
  }
  catch(err){
    res.status(404)
    throw new Error(err)
  }
}