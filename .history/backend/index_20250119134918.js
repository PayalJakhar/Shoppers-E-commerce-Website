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