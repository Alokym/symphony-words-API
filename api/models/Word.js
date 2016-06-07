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
        owners: {
            collection: 'vocabulary',
            via: 'words'
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
