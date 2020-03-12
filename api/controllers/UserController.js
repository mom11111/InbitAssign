const User = require('../models/User');
const Interview = require('../models/Interview');
const jwt = require('jsonwebtoken');

module.exports.login = async (req, res) =>
{
    var user = await User.findOne({name: req.body.email});
    if(user.psw == req.body.psw){
        var token = jwt.sign({id: user._id}, 'Sshshshs');
        res.send({
            success: true,
            token: token
        });
    }
    else{
        res.send({
            msg: 'Invalid credentials'
        })
    }
}

module.exports.listInterviews = async (userId) =>
{
    return await Interview.find({
        user: userId,
        start_time: { $gte: new Date() }
    }).populate('participants', 'name');
    
}