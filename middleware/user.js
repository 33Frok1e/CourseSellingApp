// const { User } = require('../db/db')
// // Middleware for handling auth
// function userMiddleware(req, res, next) {
//     // Implementation of admin auth logic
//     // You need to check the headers and validate the admin from the Admin DB. Check readme for the exact headers to be expected
//     const username = req.headers.username
//     const password = req.headers.password

//     User.findOne({
//         username : username,
//         password : password
//     })
//     .then( function(value){
//         if(value){
//             next()
//         } else {
//             res.status(401).json({ msg: "User doesn't exist" });
//         }
//     })
// }

// Below are with JWT
const { JWTSECRET } = require('../config');
const jwt = require('jsonwebtoken')

function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    // Bearer ahsgshk'a'saks';';d;d;qfkl
    const words = token.split(' ');
    const jwtToken = words[1];
    const decodedValue = jwt.verify(jwtToken, JWTSECRET);
    if (decodedValue.username) {
        decodedValue.username = req.username;
        next();
    } else {
        res.status(403).json({
            message: 'You are not authenticated. Please try again'
        });
    }
}

module.exports = userMiddleware;