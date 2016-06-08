module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        translations: {
            collection: 'word',
            via: 'translationOf'
        },
        translationOf: {
            collection: 'word',
            via: 'translations'
        },
        translation: {
            collection: 'word',
            via: 'translation',
            through: 'vocabularywordhastranslation'
        },
        findOrCreate: function (word, language) {
            var initialWord = word;
            return this.find({name: word.name, language: language})
                .then(function (word) {
                    if (word) {
                        return word;
                    }
                    return this.create(initialWord);
                })
                .then(function (word) {
                    return word;
                })
                .catch(function (err) {
                    return err;
                });
        }
    }
};
