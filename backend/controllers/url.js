const URL = require('../models/url')
let Validator = require('validatorjs');
const response = require("../helpers/response");
const status = require("../helpers/status.conf");
// const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const drivers = require('../models/driver');
// const jwt = require('jsonwebtoken');


class userControll {
        static algorithm = 'aes-256-cbc';
        static secretKey = crypto.randomBytes(32); // Generate a random 32-byte key (256 bits)
        static iv = crypto.randomBytes(16); // Generate a 16-byte IV (Initialization Vector)
    
    
    static Create = async (req, res) => {
        //    const { internalCall } = req.body;
        console.log(req.body,'req')
        let returnResponse = {};        
        try {
            let rules = {
                'full_name': 'required|string',
                'email': 'required|string',
                'phone_no': 'required|string',
                'password': 'required|string',
            };
            let validation = new Validator(req.body, rules);
            const isValidData = validation.passes();
            if (!isValidData) {
                let errorResponse = {};
                for (let key in rules) {
                    const error = validation.errors.get(key);
                    if (error.length) {
                        errorResponse[key] = error;
                    }
                }
                return response(res, status.BAD_REQUEST, 400, errorResponse,)
            }
            const { full_name, email, password, phone_no, role } = req.body;
            const data =await URL.create({
                name: full_name,
                email: email,
                phone_no: phone_no,
                is_active: 1,
                role: role,
                password: this.encrypt(password)
            });
            console.log(data,'datadata')
            return response(res, status.DATA_SAVE, 200, 'Data Save successfully');
            //   await data.save();

        } catch (error) {
            returnResponse = {
                message: error.message
            };
            console.log(error, 'error')
            return response(res, status.UNEXPECTED_ERROR, 500, returnResponse,);
        }
    }
  
    static encrypt(text) {
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.iv);
        let encrypted = cipher.update(text, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted 
            
        
    }

   
    static decrypt(encryptedText) {
        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(encryptedText.iv, 'hex'));
        let decrypted = decipher.update(encryptedText.encryptedData, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
    static Login = async (req, res) => {
        let returnResponse = {};
    
        try {
            let rules = {
                'email': 'required|string|email',
                'password': 'required|string',
            };
            let validation = new Validator(req.body, rules);
    
            const isValidData = validation.passes();
    
            if (!isValidData) {
                let errorResponse = {};
                for (let key in rules) {
                    const error = validation.errors.get(key);
                    if (error.length) {
                        errorResponse[key] = error;
                    }
                }
                return response(res, status.BAD_REQUEST, 400, errorResponse);
            }
            const { email, password, } = req.body;        
            // Await the result of the database query
            // const user = await URL.find({email:email,password:this.encrypt(password)}).select('email password')
            const user = await URL.find({email:email,password:this.encrypt(password)})
            console.log(user)
            // Check if user exists
            if (!user || user.length<1) {
                return response(res, status.NOT_FOUND, 404,  'User not found' );
            }
            // const token = jwt.sign({ user: user },"drowsiness", { expiresIn: '1h' });
            // console.log('user=======', user);
            // jwt.sign({user},"secretkey",(err,token)=>{

            // })
            // res.json({ success: true, user: user });
            return response(res, 'Data Found', 200, user);
            
        } catch (error) {
            returnResponse = {
                message: error.message
            };
            console.log(error, 'error');
            return response(res, status.UNEXPECTED_ERROR, 500, returnResponse);
        }
    };

    
    static AddDrivers = async (req, res) => {
        //    const { internalCall } = req.body;
        console.log(req.body,'req')
        let returnResponse = {};        
        try {
            let rules = {
                'driver_name': 'required|string',
                'email': 'required|string',
                'vehicle_no': 'required|string',
                'password': 'required|string',
            };
            let validation = new Validator(req.body, rules);
            const isValidData = validation.passes();
            if (!isValidData) {
                let errorResponse = {};
                for (let key in rules) {
                    const error = validation.errors.get(key);
                    if (error.length) {
                        errorResponse[key] = error;
                    }
                }
                return response(res, status.BAD_REQUEST, 400, errorResponse,)
            }
            const {  email, password, vehicle_no,driver_name  ,user_id} = req.body;
            const data =await drivers.create({
                name: driver_name,
                email: email,
                user_id:user_id,
                vehicle_no: vehicle_no,            
                password: this.encrypt(password)
            });
            console.log(data,'datadata')
            return response(res, status.DATA_SAVE, 200, 'Data Save successfully');
            //   await data.save();

        } catch (error) {
            returnResponse = {
                message: error.message
            };
            console.log(error, 'error')
            return response(res, status.UNEXPECTED_ERROR, 500, returnResponse,);
        }
    }
    static GetDrivers = async (req, res) => {
        let returnResponse = {};
    
        try {
            let rules = {
                'user_id': 'required|string',
            };
            let validation = new Validator(req.body, rules);
    
            const isValidData = validation.passes();
    
            if (!isValidData) {
                let errorResponse = {};
                for (let key in rules) {
                    const error = validation.errors.get(key);
                    if (error.length) {
                        errorResponse[key] = error;
                    }
                }
                return response(res, status.BAD_REQUEST, 400, errorResponse);
            }
            const {  user_id, } = req.body;        
          
            const user = await drivers.find({user_id:user_id})
          
            if (!user || user.length<1) {
                return response(res, status.NOT_FOUND, 404,  []);
            }
            return response(res, 'Data Found', 200, user);
            
        } catch (error) {
            returnResponse = {
                message: error.message
            };
            console.log(error, 'error');
            return response(res, status.UNEXPECTED_ERROR, 500, returnResponse);
        }
    };
    
}

module.exports = userControll
// module.exports = getUserByEmail