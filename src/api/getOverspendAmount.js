const getSecret = require('../apiAccess/getSecret')

module.exports = async (secretsClient) => await getSecret(secretsClient, 'totalOverspend');