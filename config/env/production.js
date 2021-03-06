/**
 * Production environment settings
 *
 * This file can include shared settings for a production environment,
 * such as API keys or remote database passwords.  If you're using
 * a version control solution for your Sails app, this file will
 * be committed to your repository unless you add it to your .gitignore
 * file.  If your repository will be publicly viewable, don't add
 * any private information to this file!
 *
 */

module.exports = {
    /***************************************************************************
     * Set the default database connection for models in the production        *
     * environment (see config/connections.js and config/models.js )           *
     ***************************************************************************/

    models: {
        connection: 'words_prod',
        migrate: 'save'
    },
    connections: {
        words_prod: {
            adapter: 'sails-mongo',
            host: '127.0.0.1',
            port: 27017,
            database: 'words'
        }
    },
    port: 8080
};
