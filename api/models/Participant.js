const mongoose = require('mongoose');

var participantSchema=new mongoose.Schema({
    name:String,
    email:String,
    domain:String
 });

 var Participant=mongoose.model("Participant",participantSchema);
 module.exports=Participant;