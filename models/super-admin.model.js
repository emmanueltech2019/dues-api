const {Schema, model} = require("mongoose")


const SuperAdminSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"superadmin"
    }
})


module.exports=model("SuperAdmin",SuperAdminSchema)