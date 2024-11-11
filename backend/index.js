const express = require("express");
const { connectToMongoDB } = require("./connect");
// const urlRoute = require('./routes/url')
const app = express();
const urlRoute = require('./routes/url')
// const URL = require('./models/url');
const PORT = 8001;
const cors = require('cors');

// connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
// .then (()=> console.log("MongoDB connected"))
connectToMongoDB('mongodb://127.0.0.1:27017/drowsiness')
.then (()=> console.log("MongoDB connected"))
// app.use(express.urlencoded({extends:false}))
// app.use(express.json());
// connectToMongoDB('mongodb://127.0.0.1:27017/short-url').then(x=>console.log('connected to db'))
app.use(cors())
app.use(express.json())
app.use("/url" , urlRoute);
// app.use("/url" , urlRoute);


app.listen(PORT , ()=> console.log(`Server started at port : ${PORT}`))