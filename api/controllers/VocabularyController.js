module.exports = {
    create: function (req, res) {
        var vocabulary = req.body;
        WordService.validate(vocabulary.words, function (err) {
            res.status(400);
            return res.json(err);
        });
        VocabularyService.validate(vocabulary, function (err) {
            res.status(400);
            return res.json(err);
        });
        WordService.storeWords(vocabulary.words, vocabulary.from, vocabulary.to)
            .then(function (words) {
                return [VocabularyService.create(vocabulary.name), words];
            })
            .spread(function (voc, words) {
                return VocabularyService.linkWords(voc, words);
            })
            .then(function (voc) {
                return VocabularyService.findOneById(voc.id);
            })
            .then(function (voc) {
                return res.json(voc);
            })
            .catch(function (err) {
                return res.json(err);
            });
    },
    get: function (req, res) {
        var id = req.param('id');
        VocabularyService.findOneById(id)
            .then(function (voc) {
                return res.json(voc);
            })
            .catch(function (err) {
                return res.json(err);
            });
    }
};