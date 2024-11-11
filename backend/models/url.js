const mongoose = require('mongoose');
// const { INTEGER } = require('sequelize');
const urlSchema = new mongoose.Schema(
    {
        name : {
            type : String,
            required : true,
            // unique: true,
        },
        email : {
            type : String,
            required : true,
            unique: true,
        },
        phone_no : {
            type : String,
            required : true,
            unique: true,
        },
        is_active:{
            type : String,
        },
        role : {
            type : String,
            // required : true,
            // unique: true,
        },
        password : {
            type : String,
            required : true,
            // unique: true,
        },
        
    } , 
    // { timestamp : true }
    );
    const URL =mongoose.model('user',urlSchema)
    module.exports=URL;    