//const { config } = require('dotenv')
const User = require('../models/users')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const config  =  require('../config/db')
const getController = (req, res) => {

    res.send('Hello! Martin, how are you?')
    
}

const dashboard = (req, res) => {

    res.send('Dashboard')
    
}


const addUser = (req,res) => {
    if (req.body.name && req.body.password == '') {
       res.json({success:false,msg:"all fields are required"})
    } else {
        const newUser = User({
            name: req.body.name,
            password:req.body.password
        })

        newUser.save(function (err, newUser) {
            if (err) {
                res.json({ success: false, msg: "Failed to save user" })
                console.log(err)
            } else {
                res.json({success:true,msg:"successfully saved user"})
            }
        })
   } 
}


const authenticate = (req, res) => {
    
    User.findOne({
        name: req.body.name,
        
    }, function (err, user) {
        if (err) {
            res.status('403').send({success:false,msg:"User not found"})
        } else if (!user) {
            res.status('403').send({success:false,msg:"User not found"})
        } else {


            bcrypt.compare(req.body.password,user.password, function (err, isMatch) {
                
                if (isMatch) {
                    //console.log('password matched')
                    const token = jwt.encode(user, config.secrete)
                    res.json({success:true,token:token})
                }
                else {
                    console.log(err)
                    return res.status(403).send({success:false,msg:"Authentication failed, incorrect password"})
                }
                
            })
            // user.compare(req.body.password, function (err, isMatch) {
                
            //     if (isMatch) {
            //         const token = jwt.encode(user, config.secrete)
            //         res.json({success:true,token:token})
            //     }
            //     else {
            //         return res.status(403).send({success:false,msg:"Authentication failed, incorrect password"})
            //     }
                
            // })
        }
    })
    
}

const getTokenInfo = (req, res) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === Bearer) {
        const token = req.headers.authorization.split(' ')[1]
        const decodeToken = jwt.decode(token, config.secrete)
        return res.json({success:true,msg:"Hello"+decodeToken.name})
    } else {
        return res.json({success:false,msg:'No Headers'})
    }
    
}

module.exports = {getController,addUser,authenticate,getTokenInfo,dashboard}