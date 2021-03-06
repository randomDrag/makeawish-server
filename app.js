const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require ('cookie-parser');

//route

const userRoute = require('./routes/users');

const userlogin = require('./routes/user.login');

const userInfo = require('./routes/user.wish');

const Admin = require('./routes/admin');

const Amember = require('./routes/adminMember');

const FAQ = require('./routes/FAQ');



const app = express();


require('dotenv').config();

const PORT = process.env.PORT|| 5000;

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
    credentials : true,
    maxAge : 1800,
    allowedHeaders : HEADER,
}));

app.use(cookieParser());





//route like middelware 

app.use("/users",userRoute);

app.use("/loginuser",userlogin);

app.use("/userinfo",userInfo);

app.use("/admin",Admin);

app.use("/member",Amember);

app.use("/FAQ",FAQ);


app.listen(PORT,()=>{

    console.info(`SERVER RUNNING AT ${PORT}`)

})

