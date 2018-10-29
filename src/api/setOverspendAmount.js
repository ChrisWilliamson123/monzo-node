const storeSecret = require('../apiAccess/storeSecret')

module.exports = async (amount, secretsClient) => await storeSecret(secretsClient, 'totalOverspend', amount > 0 ? amount : 0);