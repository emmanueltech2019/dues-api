const express = require("express")
const {register,login,profile,getAllRealtors, changePassword, updatePersonalDetails} = require("../controllers/admin")
const { requireSignin, adminMiddleware } = require("../middlewares")
const routes = express.Router()


routes.patch("/change/details",requireSignin,updatePersonalDetails)
routes.post("/change/password",requireSignin,changePassword)
routes.get("/profile",requireSignin,profile)
routes.post("/register",register)
routes.post("/login",login)


module.exports=routes