const User = require('../model/user.model.js');
const Bcrypt = require("bcryptjs");
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");
// User signUp 

const signUp = (req,res) => {

    const user = new User({
        user_id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        role: req.body.role,
        password: Bcrypt.hashSync(req.body.password, 10)
    })

    user.save().then( result => {
        console.log(result)
        res.status(200).json({
            message: "Authentication successful",
            data: result
        })
    })
    .catch(err => {
        return res.status(400).json({
            message: "Bad request",
            data: err
        })
    })
}
const login = (req,res) => {
    User.findOne({email:req.body.email}).then(data =>{
        Bcrypt.compare(req.body.password,data.password,(error,result) =>{
            // console.log(error,result);
            if(error){
                return res.status(401).json({
                    message: 'Invalid credentials'
                });
            }
            if(result) {
                const token = jwt.sign(
                    {
                      email: data.email,
                      id: data._id
                    },
                      process.env.APP_SECRET,
                    {
                      expiresIn: "1d"
                    }
                  );
                return res.status(200).json({
                   message: 'Authentication successfull',
                   data: {
                    user_id: data._id,
                    access_token: token
                   }
                });
            }else return res.status(401).json({
                message: 'Authentication failed'
            })
        })
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Authentication failed',
            data: err
        })
    })
}
// normal get all users
const getAll = (req,res) => {
    User.find().select('-password').then(data => {
        return res.status(200).json({
            message: 'fetched all users',
            data: data
        })
    })
    .catch(err => {
        res.status(500).json({
            message: 'something went wrong',
            data: err
        })
    })
}

module.exports = {getAll,signUp,login};