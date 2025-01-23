const port= 4000;
const express= require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

app.use(express.json()); // whatever we will get through response will automatically pass through json
app.use(cors()); // using this our react project will connect to port 4000

//Database connection with Mongodb

mongoose.connect("mongodb+srv://payal:Rockerzz550@cluster0.ctboc.mongodb.net/e-commerce");

// API Creation

app.get('/',(req,res)=>{
    res.send("Express App is Running");
});

//Image storage Engine

const storage = multer.diskStorage({
    destination: './upload/images'
})



app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running on Port"+port);
    }
    else{
        console.log("Error:"+error);
    }
});
