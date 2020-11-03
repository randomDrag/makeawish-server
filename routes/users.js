const express = require('express');


let userNumber = require('../models/mobile.number.model');
let userEmail = require("../models/user.model");


let route = express.Router();

express.urlencoded({extended : true});

route.get("/", (req, res) => {

    res.status(200).json({
        msg: "OK"
    });



});


route.post("/verify", (req, res) => {

    try {
        let data = {
            MO_NUMBER: req.body,
            USER : userEmail._id
        }

        let user = new userNumber(data);

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

    } catch (e) {


        res.status(401).json({
            msg: "server error",
            err: e.message
        });



    }


});








module.exports = route;


