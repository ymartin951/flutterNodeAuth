const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema


const userSchema = Schema({
    name: {
        type: String,
        require:true
    },
    password: {
        type: String,
        require:true
    }
})

userSchema.pre('save', function (next) {
    const user = this
    if (this.isModified('password')) {
        if (this.isNew) {
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return next(err)
                }
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) {
                        return next(err)
                    }
                    user.password = hash
                    next()
                })
            })
        } else {
            return next()
        }
    }
})


//Comparing password
userSchema.compare = (pass,cb) => {
    bcrypt.compare(pass, this.password, function (err, isMatch) {
        if (err) {
            return cb(err)
        }
        cb(null,isMatch)
    })
}

const User  = mongoose.model('User',userSchema)

module.exports  = User

