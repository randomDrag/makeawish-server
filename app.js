const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//route

const userRoute = require('./routes/users');




const app = express();


require('dotenv').config();

const PORT = 5000;

const SITE = process.env.URL || '*';

const HEADER = process.env.HEADER || [   "Upgrade-Insecure-Requests", "1"];

const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/makeawish';



mongoose.connect(DB_URL,{

    useUnifiedTopology: "true",
    useNewUrlParser: "true"

},(err)=>{
    console.info(`DB is connected`);
});

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

app.use(express.json());

app.use(cors({
    origin: SITE,
    optionsSuccessStatus:202,
}))








app.use("/users",userRoute);



app.listen(PORT,()=>{

    console.info(`SERVER RUNNING AT ${PORT}`)

})

