const mongoose = require('mongoose')
const empSchema  = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        min:6
    },
    email:{
        type: String,
        required: true,
        max: 255,
        min:6
    },
    mobile:{
        type: Number,
        required: true,
    },
    dob:{
     type:Number,
     required:true
    },
    date:{
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Emp', empSchema)
