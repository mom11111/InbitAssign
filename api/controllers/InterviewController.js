const Interview = require('../models/Interview');

function reqToModel(req, res)
{
    let body = req.body;

    return new Interview({
        start_time: body.start_time,
        end_time: body.end_time,
        participants: body.parts,
        user: res.locals.user._id
    });
}

module.exports.create = async (req, res) =>
{
    console.log(req.body);
    var model = reqToModel(req, res);

    var end_time = model.end_time;
    var start_time = model.start_time;

    var parts = model.participants;

    if (parts.length < 2) {
        res.send({ msg: "o~w~o" });
        return;
    }

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var list = await Interview.find({
            "participants": { $in: [part] },
            $or: [
                { "start_time": { $lte: end_time, $gte: start_time } },
                { "end_time": { $lte: end_time, $gte: start_time } },
            ]
        });

        if (list.length > 0) {
            res.send({ msg: "~o w o~" });
            return;
        }
    }

    await model.save();
};

module.exports.update = async (req, res) =>
{
    var model = reqToModel(req, res);

    await Interview.findByIdAndUpdate(req.body.id, {$set: model });
}