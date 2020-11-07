const express = require('express');
const bcrypt = require('bcrypt');

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const saltRounds = 10;

let userEmail = require("../models/user.model");

let Info = require("../models/userInfo.model");


//some vars

let Email = "";
let Password = "";
let PhoneNumber = "";
let sid = "";



let route = express.Router();

express.urlencoded({
    extended: true
});



route.post("/verify", async (req, res) => {

    try {

        PhoneNumber = "+91" + req.body.number;
        Email = req.body.Email;
       

      await  userEmail.findOne({
            "MOBILE_NUMBER": PhoneNumber
        }, (err, doc) => {

            if (err) {


                res.status(400).json({
                    msg: "ERROR"
                });


            } else {

               
                if ((doc === null) ) {
                   
                    bcrypt.hash(req.body.Password, saltRounds, (err, hash) => {

                        Password = hash;

                       client.verify.services.create({
                            friendlyName: 'MAKE A WISH',
                            codeLength: 6
                        }).then(service =>
                            client.verify.services(service.sid).verifications.create({
                                to: PhoneNumber,
                                channel: 'sms'
                            })
                            .then((verification) => {

                                sid = verification.serviceSid;

                                res.status(200).json({
                                    msg: true
                                });
                            })


                        );



                    });



                }else{
               
                    res.status(200).json({
                        msg: false
                    });
                }

            }

        });











    } catch (e) {


        res.status(401).json({
            msg: "server error",
            err: e.message
        });



    }


});




route.post("/register", async (req, res) => {
    console.log(Email);
    let pin = req.body.code;
    try {
        await client.verify.services(sid)
            .verificationChecks
            .create({
                to: PhoneNumber,
                code: pin
            })
            .then(verification_check => {

              

              
                if (verification_check.valid) {
                  
                    let user = new userEmail({
                        Email: Email,
                        Password: Password,
                        MOBILE_NUMBER: PhoneNumber,
                        userInfo : new Info()._id
                    });

             
                    user.save((err, doc) => {

                        if (err) {
                            res.status(401).json({
                                msg: "server error",
                                e: err.message
                            });
                        } else {


                            res.status(200).json({
                                msg: "OK",
                                data: doc
                            });


                        }

                    });
                }
            }).catch((e) => {
                console.log(e);
            })
    } catch (e) {
        res.status(401).json({
            msg: "server error",
            err: e.message
        });

    }




});



module.exports = route;