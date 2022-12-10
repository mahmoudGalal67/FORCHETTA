import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"


export const auth =(req,res)=>{
  const{name , email} = req.body
try{
if(name===process.env.ADMIN_NAME && email===process.env.ADMIN_EMAIL){
  const salt = bcrypt.genSaltSync(10);
  const hashedEmail = bcrypt.hashSync(email, salt);
  const hashedName = bcrypt.hashSync(name, salt);
  const adminToken = jwt.sign({name:hashedName , email:hashedEmail} , process.env.ADMINTOKEN)
  res.cookie("admin_token" , adminToken , {
    httpOnly:true
  })
  res.redirect("/dashboard")
}else{
  req.flash("error" , "Wrong name or email")
  res.redirect("/dashboard/login")
}
}
catch(err){
  throw new Error(err)
}
}