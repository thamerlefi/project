const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true, min: 3},
    lastName: {type: String, required: true, min: 3},
    email: {type: String,required: true},
    password:{type: String,required: true,min: 6},
    isAdmin :{type: Boolean,default: false,required: true},
    image:{
        type:Object,
        default: {
            secure_url: ''
        },
        required: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User', UserSchema)