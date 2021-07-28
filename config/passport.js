const JwtStrategy = require('passport-jwt').Strategy
 const ExtractJwt = require('passport-jwt').ExtractJwt
 const mongoose = require('mongoose')
 //const Admin = mongoose.model('admins')
 const Admin = require('../models/Admin')
 const User = mongoose.model('users')
 const tokenKey = require('./keys').secretOrKey
  
 let opts = {};
 opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
 opts.secretOrKey = tokenKey

 module.exports = passport => {
     passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        const currentUser = await User.findById(jwt_payload.id)
        if(currentUser) return done(null,currentUser)
        const currentAdmin = await Admin.findById(jwt_payload.id)
        if(currentAdmin) return done(null,currentAdmin)
        return done(null,false)
     }))
 }