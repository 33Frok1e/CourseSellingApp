// const { Admin } = require('../db/db');
// // Middleware for handling auth
// function adminMiddleware(req, res, next) {
//     // Implementation of admin auth logic
//     // You need to check the headers and validate the admin from the Admin DB. Check readme for the exact headers to be expected
//     const username = req.headers.username
//     const password = req.headers.password

//     Admin.findOne({
//         username : username,
//         password : password
//     })
//     .then( function(value){
//         if(value){
//             next()
//         } else {
//             res.status(401).json({ msg: "Admin doesn't exist" });
//         }
//         console.log("Username:", username);
//         console.log("Password:", password);
//     })
//     .catch(function(err) {
//         console.log(err.message);
//         res.status(500).json({ msg: "Internal server error" });
//     });
    
// }

// Below are with JWT
const { JWTSECRET } = require('../config');
const jwt = require('jsonwebtoken')

function adminMiddleware(req, res, next) {
    const token = req.headers.authorization; // Bearer Token
    const words = token.split(' '); // ["Bearer"," ","Token"]
    const jwtToken = words[1]; // Token
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

module.exports = adminMiddleware;