const mongoose = require('mongoose');
// const { INTEGER } = require('sequelize');
const driverSchema = new mongoose.Schema(
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
        vehicle_no : {
            type : String,
            required : true,
            unique: true,
        },
        
        password : {
            type : String,
            required : true,
            // unique: true,
        },
        user_id : {
             type: mongoose.Schema.Types.ObjectId,
            //  ref:user 
            // required : true, 
            // unique: true,
        },
        
    } , 
    // { timestamp : true }
    );
    const drivers =mongoose.model('driver',driverSchema)
    module.exports=drivers;    