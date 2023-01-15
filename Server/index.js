const express =require('express')
require('dotenv').config()
const bodyParser = require("body-parser");
const mongo = require('mongoose')
const cors= require('cors')
const app = express()

const authRoutes = require('./routes/authRoutes')
// mongoose.connect(process.env.MONGO_URL,()=>console.log("Db is connected"))
mongo.connect(process.env.MONGO_URL, { usenewUrlParser: true });
const db = mongo.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Mongodb connection complete");
});

//middlewares
 app.use(cors())
 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use('/api',authRoutes);
 app.use('/',(req,res)=>{
    res.send("Working")
 });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const port = process.env.PORT || 3000;


 
app.listen(port,()=>console.log("Server has started successfully"))

