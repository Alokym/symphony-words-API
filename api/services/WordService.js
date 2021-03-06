var Q = require('q');
module.exports = {
    validate: function (words, cb) {
        if (!_.isArray(words)) {
            return cb('Field "words" should be array of words!');
        }
        if (!words || !words.length) {
            return cb('Words are required!');
        }
        _.each(words, function (word) {
            if (!word.name || !toString(word.name).length) {
                return cb('One of word name is empty!');
            }
            if (!word.translation || !toString(word.translation).length) {
                return cb('One of translation is empty!');
            }
        });
        return;
    },
    storeWords: function (words, from, to) {
        var deferred = Q.defer(),
            wordsResult = [];
        async.eachSeries(words, function (word, cb) {
            return Q.all([
                Word.findOrCreate({name: word.name, language: from || 'en'}),
                Word.findOrCreate({name: word.translation, language: to || 'ua'})
            ]).spread(function (word, translation) {
                var result = {
                    word: word,
                    translation: translation
                };
                wordsResult.push(result);
                cb();
            }).catch(function (err) {
                cb(err);
            });
        }, function (err) {
            if (err) {
                deferred.reject(err);
            }
            deferred.resolve(wordsResult);
        });
        return deferred.promise;
    },
    link: function (words) {
        async.eachSeries(words, function (wordData, cb) {
            var word = wordData.word;
            var translation = wordData.translation;
            word.translations.add(translation.id);
            word.save().fail(function () {})
                .then(function () {
                    cb();
                });
        });
    }
};
