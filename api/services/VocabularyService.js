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
        var vocabularyWordHasTranslationIds = _.map(words, function (wordData) {
            return {vocabulary: voc.id, word: wordData.word.id, translation: wordData.translation.id};
        });
        return [voc, VocabularyWordHasTranslation.create(vocabularyWordHasTranslationIds)];
    },
    findOneById: function (id) {
        var vocabulary = Vocabulary.findOne({id: id})
            .then(function (voc) {
                return [voc, VocabularyWordHasTranslation.find({vocabulary: id}).populate('word').populate('translation')];
            })
            .spread(function (voc, words) {
                _.each(words, function (word) {
                    delete word.vocabulary;
                });
                var vocResult = _.clone(voc);
                vocResult.words = words;
                return vocResult;
            })
            .catch(function (err) {
                return err;
            });

        return vocabulary;
    }
};
