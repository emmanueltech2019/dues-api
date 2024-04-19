const express = require("express")
const {register,login,profile,getAllRealtors, changePassword, updatePersonalDetails} = require("../controllers/admin")
const { requireSignin, adminMiddleware } = require("../middlewares")
const routes = express.Router()
const { getAllHolidayRecords, createHolidayRecord, getHolidayRecordById, updateHolidayRecordById, deleteHolidayRecordById } = require("../controllers/holiday")


routes.patch("/change/details",requireSignin,updatePersonalDetails)
routes.post("/change/password",requireSignin,changePassword)
routes.get("/profile",requireSignin,profile)

// routes.get("/holiday",requireSignin,profile)
// Route to create a new holiday record
routes.post('/holiday-records', requireSignin, createHolidayRecord);

// Route to get all holiday records
routes.get('/holiday-records', requireSignin, getAllHolidayRecords);

// Route to get a single holiday record by ID
routes.get('/holiday-records/:id', requireSignin, getHolidayRecordById);

// Route to update a holiday record by ID
routes.put('/holiday-records/:id', requireSignin, updateHolidayRecordById);

// Route to delete a holiday record by ID
routes.delete('/holiday-records/:id', requireSignin, deleteHolidayRecordById);

routes.post("/register",register)
routes.post("/login",login)


module.exports=routes