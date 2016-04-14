module.exports = {
    get: function (req, res) {
        Word.findOne({id: req.param('id')}, function (err, words) {
            if (err) {
                res.statusCode = 500;
                res.json({message: err});
                return;
            }
            res.json(words);
        });
    },
    create: function (req, res) {
        var words = req.body;
        Word.create({words: words}, function (err, words) {
            if (err) {
                res.statusCode = 500;
                res.json({message: err});
                return;
            }
            res.statusCode = 201;
            res.json(words);
        });
    }
};