const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => 
{
    var token = req.headers.authorization;

    if (token != null) {
        console.log("token: ");
        console.log(token);
        var decoded = jwt.verify(token.split(' ')[1], 'Sshshshs');
        var user = await User.findById(decoded.id);
        res.locals.user = user;
    }
    
    next();
}