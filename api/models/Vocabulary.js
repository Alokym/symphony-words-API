module.exports = {
    autoCreatedAt: true,
    autoUpdatedAt: true,
    attributes: {
        name: {
            type: 'string',
            required: true
        },
        words: {
            collection: 'vocabularywordhastranslation',
            via: 'vocabulary'
        }
    }
};
