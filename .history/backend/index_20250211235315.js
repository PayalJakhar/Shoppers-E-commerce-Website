const port = 4000;
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");

dotenv.config();


app.use(express.json()); // whatever we will get through response will automatically pass through json
app.use(cors()); // using this our react project will connect to port 4000

// Database connection with Mongodb
mongoose.connect("mongodb+srv://payal:Rockerzz550@cluster0.ctboc.mongodb.net/e-commerce");

// API Creation
app.get('/', (req, res) => {
    res.send("Express App is Running");
});

// Image storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Creating upload Endpoint for images
app.use('/images', express.static('upload/images'));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    }); // so our users will get image in json format
});

// Schema for creating product
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true,
    },
    old_price: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    available: {
        type: Boolean,
        default: true,
    },
});

const ngoSchema = new mongoose.Schema({
    name: { type: String, required: true },
    url: { type: String, required: true }
});

const Ngo = mongoose.model("Ngo", ngoSchema);


app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1); // we will only get the last product from the array
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved");

    res.json({
        success: true,
        name: req.body.name,
    });
});

//add the ngo 
app.post('/addngo', async (req, res) => {
    try {
        const { name, url } = req.body;

        if (!name || !url) {
            return res.status(400).json({ success: false, message: "Name and URL are required" });
        }

        const ngo = new Ngo({ name, url });
        await ngo.save();

        console.log("NGO Saved:", ngo);
        res.json({ success: true, name: ngo.name });
    } catch (error) {
        console.error("Error saving NGO:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


// Creating API for deleting products
app.post('/removeproduct', async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Removed");
    res.json({
        success: true,
        name: req.body.name,
    });
});

// Creating API for getting all products
app.get('/allngos', async (req, res) => {
    try {
        const ngos = await Ngo.find({});
        console.log("All NGOs Fetched");
        res.json({ success: true, ngos });
    } catch (error) {
        console.error("Error fetching NGOs:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get('/allproducts',async (req,res)=>{
    let products=await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

// Schema creating for user model
const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});




// Clothes schema
const ClothesSchema = new mongoose.Schema({
    type: {
      type: String,
      required: true,
      enum: ['T-shirt', 'Shirt', 'Jeans', 'Trouser'],
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    damage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    description: {
      type: String,
      required: true,
    },
  });
  
  // Donation schema
  const DonationSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    clothesDetails: {
      type: [ClothesSchema],
      required: true,
    },
    ngo: {
      name: {
        type: String,
        required: true,
      },
    },
    donationDate: {
      type: Date,
      required: true,
    },
  });
  
  const Donation = mongoose.model("Donation", DonationSchema);
  
  module.exports = Donation;

  app.post('/donation', async (req, res) => {
    try {
        let check = await Users.findOne({ email: req.body.email });
        if (!check) {
            return res.status(400).json({ success: false, error: "Please use the same email ID." });
        }

        const donation = new Donation({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            pincode: req.body.pincode,
            clothesDetails: req.body.clothesDetails,
            ngo: { name: req.body.ngo },
            donationDate: req.body.donationDate,
        });

        await donation.save();

        // Fetch updated count after saving donation
        const donationCount = await Donation.countDocuments({ email: req.body.email });

        return res.status(200).json({ success: true, message: "Donation received!", count: donationCount });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
});
  
  app.get('/donation/count/:email', async (req, res) => {
    try {
        const email = req.params.email;  // Corrected: Fetch email from params
        const donationCount = await Donation.countDocuments({ email });

        return res.status(200).json({ success: true, count: donationCount });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
});


// Creating Endpoint for registering the user
app.post('/Signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing email address" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    } // here we have created empty cart data

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    // JWT Authentication refers to a method of securely 
    // verifying the identity of users and exchanging 
    // information between parties using JSON Web Tokens (JWT).

    // The data object is being prepared to contain the payload that 
    // will be embedded in the JWT.

    const data = {
        user: {
            id: user.id // id is the unique identifier for the user
        }
        // here user is a key containing an object 
    }

    // creation of token
    const token = jwt.sign(data, 'secret_ecom');
    // using secret_ecom our generated token wont be readable
    res.json({ success: true, token });
    // we then send the unique token as a response to the client 
});


// creating endpoint for user login
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password; // pass coming from api and the users registered password
        if (passCompare) {
            const data = {
                user: {
                    id: user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token });
        } else {
            res.json({ success: false, errors: "Incorrect Password" });
        }
    } else {
        res.json({ success: false, errors: "Incorrect email" });
    }
});

// creating endpoint for newcollection data
app.get('/newcollections', async (req, res) => {
    let products = await Product.find({}); // get is to retrieve data from server
    let newcollection = products.slice(1).slice(-8); // it takes the last eight elements
    console.log("NewCollection Fetched");
    res.send(newcollection);
});

// creating endpoint for popular in women section
app.get('/popularinwomen', async (req, res) => {
    let products = await Product.find({ category: "women" }); // get is to retrieve data from server
    let popular_in_women = products.slice(0, 4); // it takes the last eight elements
    console.log("Popular in women Fetched");
    res.send(popular_in_women);
});

// creating middleware to fetch user
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" });
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom'); // now the token will be decoded
            req.user = data.user; // here we are giving the id ok data to the req
            next(); // is used for both the above written 
        } catch (error) {
            res.status(401).send({ errors: "Please authenticate using a valid token" });
        }
    }
};

// creating endpoint for adding products in cartdata
app.post('/addtocart', fetchUser, async (req, res) => {
    try {
        console.log("added",req.body.itemId);
        // Fetch the user from the database using the user ID
        let userData = await Users.findOne({ _id: req.user.id });
        // Check if the user exists
        if (!userData) {
            return res.status(400).json({ errors: 'User not found' });
        }
        // If user exists, update the cart data
        userData.cartData[req.body.itemId] += 1;
        // Save the updated user data to the database
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send('Added');
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal server error' });
    }
});

//creating endpoint to remove product from cartdata

app.post('/removefromcart',fetchUser,async (req,res)=>{
    try {
        console.log("removed",req.body.itemId);
        // Fetch the user from the database using the user ID
        let userData = await Users.findOne({ _id: req.user.id });
        // Check if the user exists
        if (!userData) {
            return res.status(400).json({ errors: 'User not found' });
        }
        // If user exists, update the cart data'
        if(userData.cartData[req.body.itemId]>0){
        userData.cartData[req.body.itemId] -= 1;}
        // Save the updated user data to the database
        await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
        res.send('Removed');
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal server error' });
    }
})

//creating endpoint to get cart data

app.post('/getcart', fetchUser, async (req, res) => {
    try {
        console.log("GetCart");

        // Find the user by ID from the authenticated token
        let userData = await Users.findOne({ _id: req.user.id });

        // Check if user exists
        if (!userData) {
            return res.status(400).json({ errors: 'User not found' });
        }

        // Send the user's cart data back as a response
        res.json(userData.cartData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: 'Internal server error' });
    }
});

// Listens   
app.listen(port, (error) => {
    if (!error) {
        console.log("Server Running on Port" + port);
    } else {
        console.log("Error:" + error);
    }
});

//....................................................................................................................................

//.............................................................................................................................
const PaymentSchema = new mongoose.Schema({
    razorpay_order_id: {
        type: String,
        required: true,
    },
    razorpay_payment_id: {
        type: String,
        required: true,
    },
    razorpay_signature: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Payment = mongoose.model("Payment", PaymentSchema);

// ✅ Razorpay Instance
const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

// ✅ Route to create a new order
app.post('/api/payment/order', async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ success: false, message: "Invalid amount" });
        }

        const options = {
            amount: parseInt(amount * 100, 10), // Convert to paisa
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
        };

        const order = await razorpayInstance.orders.create(options);
        res.status(200).json({ success: true, order });
    } catch (error) {
        console.error("Razorpay Order Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

// ✅ Route to verify payment
app.post('/api/payment/verify', async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, emailId } = req.body;
        const donationCount = await Donation.countDocuments({ emailId });


        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !emailId) {
            return res.status(400).json({ success: false, message: "Missing payment details" });
        }

        const sign = `${razorpay_order_id}|${razorpay_payment_id}`;
        const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
            .update(sign)
            .digest("hex");

        if (expectedSign !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Invalid Payment Signature" });
        }

        const payment = new Payment({ razorpay_order_id, razorpay_payment_id, razorpay_signature, emailId });
        await payment.save();
        if (donationCount >= 500) {
            user.coins -= 500;
        } else {
            return res.status(400).json({ success: false, message: "Not enough coins!" });
        }

        return res.status(200).json({ success: true, message: "Payment Verified Successfully" });
    } catch (error) {
        console.error("Payment Verification Error:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});


app.get('/payment/counts/:email', async (req, res) => {
    try {
        const emailId = req.params.email; // Corrected variable name
        const paymentCount = await Payment.countDocuments({ emailId });

        return res.status(200).json({ success: true, count: paymentCount });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, error: err.message });
    }
});
