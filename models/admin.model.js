const {Schema, model} = require("mongoose")


const adminSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    company:{
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
        default:"admin"
    }
})


module.exports=model("Admin",adminSchema)