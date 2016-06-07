var Q = require('q');
module.exports = {
    validate: function (vocabulary, cb) {
        if (!vocabulary) {
            return cb('Request body is empty!');
        }
        if (!vocabulary.name) {
            return cb('Vocabulary name is required!');
        }
        return;
    },
    create: function (name) {
        return Vocabulary.create({name: name});
    },
    linkWords: function (voc, words) {
        var ids = _.map(words, function (word) {
            return word.id;
        });
        voc.words.add(ids);
        return voc.save().fail(function (err) {
            return voc;
        });
    },
    findOneById: function (id, populateOpt) {
        var vocabulary = Vocabulary.findOne({id: id}).populate('words', populateOpt || {})
            .then(function (voc) {
                var words = voc.words;
                var ids = _.map(words, function (word) {
                    return word.id;
                });
                return Word.find(ids).populate('translations')
                    .then(function (words) {
                        var vocabularyRes = _.clone(voc);
                        vocabularyRes.words = words;
                        return vocabularyRes;
                    });
            })
            .catch(function (err) {
                return err;
            });
        return vocabulary;
    }
};
