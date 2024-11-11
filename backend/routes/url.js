const express = require('express');
const { Create,Login ,AddDrivers,GetDrivers} = require('../controllers/url');
const router = express.Router();

// const urlRoute = require('./routes/url')

router.post('/signup',Create);
router.post('/login',Login);
router.post('/add-driver',AddDrivers);
router.post('/get-driver',GetDrivers);

module.exports=router;