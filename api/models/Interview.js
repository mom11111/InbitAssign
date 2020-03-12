const mongoose = require('mongoose');
const Participant = require('./Participant');

var interviewSchema = new mongoose.Schema({
    user: String,
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: Participant }],
    start_time: Date,
    end_time: Date
 });

 var Interview = mongoose.model("Interview", interviewSchema);
 module.exports = Interview;