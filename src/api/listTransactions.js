const sendRequest = require('./sendRequest');

module.exports = async (client, pagination) => (await sendRequest(client, '/transactions', pagination)).transactions;
