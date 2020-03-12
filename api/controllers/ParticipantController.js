const Part = require('../models/Participant');

module.exports.list = async () =>
{
    return await Part.find({});
};