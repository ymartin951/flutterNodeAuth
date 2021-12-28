const express = require('express')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
const connectDB = require('./config/dbconfig')
const routes = require('./routes/routes')
const { getController, dashboard } = require('./controllers/controller')
const route = require('./routes/routes')

connectDB()
const app = express()

app.use(cors())

app.use(express.json())

app.use(routes, getController)
app.use(route,dashboard)

//app.use(passport.initialize())

//require('./config/passport')(passport)

app.listen(3000, function () {
    console.log('Server running on port 3000')
})