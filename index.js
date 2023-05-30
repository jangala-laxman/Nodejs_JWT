const express = require('express')
const mongoose = require('mongoose')
const router = require('./router/index')

require('dotenv').config()
const app = express()
const port = 3000

const uri = 'mongodb+srv://jangalasaisrilaxman9:L1u9c9k9y@cluster0.sirdzhn.mongodb.net/Nodejs_JWT'
const jwt_secret = "Laxman"

const connectDB = async () => {
    try {
      await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("MongoDB connected");
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  };
  
  connectDB();

const db = mongoose.connection;
// mongoose.set({strictQuery:false})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api', router)

app.listen(port, ()=>{
    console.log(`server is listening to port ${port}`)
})