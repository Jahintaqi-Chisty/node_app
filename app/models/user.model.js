const mongoose = require("mongoose");
const validator = require('validator');
const {Schema} = require("mongoose");

const UserSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    active: {
            type: Boolean,
            required:true,
            default:true
    },
    isAdmin:{
            type: Boolean,
            required:true,
            default:false
    }
    ,
    email:{
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    },
    deviceLine :[
        {
            type:Schema.Types.ObjectId,
            ref: "DeviceLine"

        }
        ]
    ,
    cloverConfig:{
        type:Schema.Types.ObjectId,
        ref: "CloverConfig"
    }


},
{
     timestamps: true 
});


module.exports = mongoose.model("User",UserSchema)