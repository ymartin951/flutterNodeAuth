const express = require('express')
const {getController,addUser,authenticate,getTokenInfo} = require('../controllers/controller')

const route = express.Router()

route.get('/', getController)

//Add new user
route.post('/addUser', addUser)

//Authenticate User
route.post('/authenticate', authenticate)

//Get user token info
route.post('/tokeninfo',getTokenInfo)

module.exports =  route