import express from "express"

import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

import {auth} from "../controllers/auth.js" 
import { getMenu , updateMenu , addMenu , deleteMenu ,update_pageMenu } from "../controllers/menu.js"
import {addGallary , getGallary , updateGallary ,deleteGallary ,update_pageGallary } from "../controllers/gallary.js"
import {addBlogs , getBlogs , updateBlogs ,deleteBlogs ,update_pageBlogs } from "../controllers/blogs.js"
import {addEvents , getEvents , updateEvents ,deleteEvents ,update_pageEvents } from "../controllers/events.js"


const router = express.Router()

router.get('/' , (req,res)=>{
  const admin_token = req.cookies.admin_token
  if(admin_token){
    jwt.verify(admin_token,process.env.ADMINTOKEN , (err,token)=>{
      if(err) {
        return res.redirect("/login")
      }
      const correctedName = bcrypt.compareSync(process.env.ADMIN_NAME, token.name)
      const correcteEMail = bcrypt.compareSync(process.env.ADMIN_EMAIL, token.email)
      if(correctedName && correcteEMail){
        return res.status(200).render("dashboard" , { title : "Dashboard" , adminName:process.env.ADMIN_NAME, layout:'./layouts/dashboard'})
      }
    })
  }else{
    res.redirect("/dashboard/login")
  }
}) 

router.get("/login" , (req,res)=>{
  const admin_token = req.cookies.admin_token
  if(admin_token){
    return res.redirect("/dashboard")
  }
  const error = req.flash("error")
  res.render("login" ,{layout:"./layouts/login" , title:"Login" , error} )
})

router.post("/login" , auth)

router.get('/:type/add' , (req,res)=>{
  const type = req.params.type
  let error = req.flash("error")
  res.status(200).render("dashboard_add" , {title : type ,data:{error , item :{name:"" , image:"" , desc:""}},layout:'./layouts/blank'})
}) 


// Dashboard-menu
router.get("/menu",getMenu)
router.post("/menu/add",addMenu)
router.put("/menu/update/:id",updateMenu)
router.delete("/menu/delete/:id",deleteMenu)
router.get("/menu/update/:id" , update_pageMenu)

// Dashboard-gallary
router.get("/gallary",getGallary)
router.post("/gallary/add",addGallary)
router.put("/gallary/update/:id",updateGallary)
router.delete("/gallary/delete/:id",deleteGallary)
router.get("/gallary/update/:id" , update_pageGallary)

// Dashboard-blogs
router.get("/blogs",getBlogs)
router.post("/blogs/add",addBlogs)
router.put("/blogs/update/:id",updateBlogs)
router.delete("/blogs/delete/:id",deleteBlogs)
router.get("/blogs/update/:id" , update_pageBlogs)


// Dashboard-events
router.get("/events",getEvents)
router.post("/events/add",addEvents)
router.put("/events/update/:id",updateEvents)
router.delete("/events/delete/:id",deleteEvents)
router.get("/events/update/:id" , update_pageEvents)



export default router