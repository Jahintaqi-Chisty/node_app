const mongoose = require("mongoose");
const validator = require('validator');

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
    userId: {
        type: String,
        required: true
    },
    active: {
            type: Boolean,
            required:true,
            default:true
    }
    ,
    email:{
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
        }
    }

},
{
     timestamps: true 
});


module.exports = mongoose.model("User",UserSchema)