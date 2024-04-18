const express = require("express")
const {register,login,profile,getAllRealtors, changePassword, updatePersonalDetails} = require("../controllers/super-admin")
const {createCompany, getAllCompanies, getCompanyById, updateCompanyById, deleteCompanyById} = require("../controllers/company")

const { requireSignin, adminMiddleware } = require("../middlewares")
const routes = express.Router()


routes.patch("/change/details",requireSignin,updatePersonalDetails)
routes.post("/change/password",requireSignin,changePassword)
routes.get("/profile",requireSignin,profile)
routes.post("/register",register)
routes.post("/login",login)


// Route to create a new company
routes.post('/companies', requireSignin, createCompany);

// Route to get all companies
routes.get('/companies', requireSignin, getAllCompanies);

// Route to get a single company by ID
routes.get('/companies/:id', requireSignin, getCompanyById);

// Route to update a company by ID
routes.put('/companies/:id', requireSignin, updateCompanyById);

// Route to delete a company by ID
routes.delete('/companies/:id', requireSignin, deleteCompanyById);

module.exports=routes