const express = require('express');
const router = express.Router();
const user = require('../controllers/UserController');
const interview = require('../controllers/InterviewController');
const part = require('../controllers/ParticipantController');

router.post('/login', user.login);

router.get('/interviews', async (req, res) =>
{
    try{
        res.send({
            success: true,
            list: await user.listInterviews(res.locals.user._id)
        });
    }
    catch(err){
        res.send({'msg': "ooooh"});
    }
});

router.post('/interview', async (req,res) => 
{
    try{
        await interview.create(req,res);
        res.send({success: true});
    }
    catch(err){
        res.send({'msg': "aaaah"});
    }
});

router.patch('/interview', async (req,res) => 
{
    try{
        await interview.update(req,res);
        res.send({success: true});
    }
    catch(err){
        res.send({'msg': "iiiih"});
    }
});

router.get('/part', async (req, res) =>
{
    try{
        res.send({
            success: true,
            list: await part.list()
        });
    }
    catch(err){
        res.send({msg: "uuuuh"});
    }
});

module.exports = router;