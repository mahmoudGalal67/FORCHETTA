import express from "express"

import {home_events} from "../controllers/events.js"
import {getHomeData , home_gallary} from "../controllers/gallary.js"
import { home_menu , countMenu  , filterMenu} from "../controllers/menu.js"
import {home_blogs} from "../controllers/blogs.js"

const router = express.Router()

router.get("/" , getHomeData)

router.get("/about" , (req,res)=>{
  res.render("about" , {title:"About" , layout:"./layouts/main"})
})
router.get("/contact" , (req,res)=>{
  res.render("contact" , {title:"Contact" , layout:"./layouts/main"})
})

router.get("/countMenu" , countMenu)
router.get("/menuFilter" , filterMenu)

router.get("/menu" , home_menu)
router.get("/gallary", home_gallary)
router.get("/events" , home_events)
router.get("/blogs" , home_blogs)




export default router