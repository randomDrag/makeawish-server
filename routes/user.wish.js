const express = require('express');
const user = require('../models/user.model');
const jwtauth = require('../middleware/jwtauth');

const userInfo = require('../models/userInfo.model');
const {
    findOneAndRemove
} = require('../models/user.model');

let route = express.Router();


route.post('/firstpage', jwtauth, async (req, res) => {

    try {

        const {
            NAME,
            AGE,
            PLACE,
            GENDER,
            occupation
        } = req.body;

        await user.findById({
            _id: req.user
        }, (err, doc) => {
            console.log(doc.userInfo);
            if (err) {

            } else {
                if (doc != null) {

                    console.log(req.body);

                    let info = new userInfo({
                        _id: doc.userInfo,
                        NAME: NAME,
                        AGE: AGE,
                        PLACE: PLACE,
                        GENDER: GENDER,
                        occupation: occupation
                    });

                    info.save((err, docs) => {
                        if (!err) {

                            user.findByIdAndUpdate({
                                _id: req.user
                            }, {
                                welcomePage: false
                            }, (err) => {

                                if (!err) {

                                    res.status(200).json({
                                        msg: true
                                    });

                                }
                            });

                        }
                    });

                }
            }
        })




    } catch (e) {

        res.status(400).json({
            msg: false
        });


    }




});


route.get("/username/data", jwtauth, (req, res) => {

    try {

        user.findOne({
            _id: req.user
        }).populate('userInfo').exec((err, doc) => {

            if (!err) {

                res.status(200).json({
                    msg: true,
                    data: doc
                });

            }


        });

    } catch (e) {

        res.status(400).json({
            msg: false
        });
    }

});


route.post("/add/wish", jwtauth, async (req, res) => {

    try {
        await user.findOne({
            _id: req.user
        }, (err, doc) => {

            if (!err) {

                userInfo.findByIdAndUpdate({
                    _id: doc.userInfo
                }, {
                    $push: {
                        WISH: {
                            Wish_NAME: req.body.wish
                        }
                    }
                }, (err, docs) => {

                    if (!err) {
                        res.status(200).json({
                            msg: true
                        })
                    }
                })


            }

        });


    } catch (e) {

        res.status(200).json({
            msg: false
        });

    }


});

route.get("/remove/:id", jwtauth, async (req, res) => {

    try {
    let uid = req.params.id;

    await user.findById({
        _id: req.user
    }, (err, doc) => {

        if (!err) {

            userInfo.findOneAndUpdate({
                _id: doc.userInfo
            }, {
                $pull: {
                    "WISH" : {_id : uid}
                }
            }).exec((err, docs) => {

              if(!err){
                  res.status(200).json({msg : true});
              }
            })
        }
    })
    }catch (e){

        res.status(200).json({msg : false});
    }

});

route.get("/numberofall",(req,res)=>{

    try{
    user.countDocuments((err,count)=>{
        if(!err){
          
            res.status(200).json({msg: true,
                                    doc : count});
        }
    });

}catch(e){

    res.status(200).json({msg: false});
}

});


module.exports = route;