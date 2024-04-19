const {Schema, model} = require("mongoose")


const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    employeeID:{
        type:String,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        default:""
    },
    stateOfOrigin:{
        type:String,
        default:""
    },
    state:{
        type:String,
        default:""
    },
    about:{
        type:String,
        default:""
    },
    houseAdress:{
        type:String,
        default:""
    },
    officeAdress:{
        type:String,
        default:""
    },
    DOB:{
        type:String,
        default:""
    },
    password:{
        type:String,
        required:true
    },
    upline:{
        type:Schema.Types.ObjectId,
        ref:"users"
    },
    role:{
        type:String,
        default:"user"
    },
    bankDetails:{
        type:Object,
        default:{
            bankName:"",
            bankAccount:"",
            bankHolder:""
        }
    },
    socialDetails:{
        type:Object,
        default:{
            facebookURL:"",
            twitterURL:"",
            youtubeURL:"",
            instagramURL:"",
            whatsappURL:""
        }
    },
    accesscode:{
        type:String
    },
    profile:{
        type: String,
        defaut:"",
    }
})


module.exports=model("users",userSchema)