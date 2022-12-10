import express from "express"
import dotenv from "dotenv"
import ejsLayouts from "express-ejs-layouts"
import path from "path"
import { fileURLToPath } from 'url';

import flash from "connect-flash"
import fileUpload from "express-fileupload"
import session from "express-session"
import cookieParser from "cookie-parser"
import methodOverride from "method-override"

import home_routes from "./server/routes/home.js"
import dashboard_routes from "./server/routes/dashboard.js"

import { connectDB } from "./server/config/DB.js"; 
import {errorHandler} from "./server/middleWare/error.js"


const app = express()
dotenv.config()

connectDB()

const port = process.env.PORT || 5000

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(ejsLayouts)
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({extended :true}))
app.use(express.json({extended :true}))

app.use(ejsLayouts)
app.use(express.static("public"))

app.use(cookieParser('forchettaBlogSecure'));
app.use(session({
  secret: 'forchettaBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());
app.use(methodOverride('_method'))


app.use("/" , home_routes)
app.use("/dashboard" , dashboard_routes)

app.use(errorHandler)

app.set('view engine' , "ejs")
app.set("layout" , "./layouts/main")


app.listen(port , ()=> console.log("server is running on port " + port + " 👍"))