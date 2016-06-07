module.exports = {
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        words: {
            collection: 'word',
            via: 'owners',
            dominant: true
        }
    }
};
