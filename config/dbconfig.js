const mongoose = require('mongoose')
const dbconfig = require('./db')

const connectDB = async () => {
 try {
     const conn = await mongoose.connect(dbconfig.database, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
        
     })
     console.log(`connection successful:${conn.connection.host}`)
 } catch (error) {
     console.log(error)
     process.exit(1)
 }   
}

module.exports =  connectDB