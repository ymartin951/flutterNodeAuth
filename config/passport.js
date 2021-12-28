
// const jwtStrategy = require('passport').Strategy

// const extractJWT = require('passport-jwt').ExtractJwt
// const User = require('../models/users')
// const config = require('./db')

// module.exports = function (passport) {
//     const opts = {}

//     opts.secretOrKey = config.secrete
//     opts.JWTFromRequest = extractJWT.fromAuthHeaderWithScheme('jwt')
//     passport.use(new jwtStrategy(opts, function (jwt_payload, done) {
//         User.findOne({ 
//             id: jwt_payload.sub
            
//         }, function (err, user) {
//             if (err) {
//                 return done(err,false)
//             }
//             if (user) {
//                 return done(null,user)
//             } else {
//                 return done(null,false)
//             }
//         })
//     }))

// }