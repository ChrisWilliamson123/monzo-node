const sendRequest = require('./sendRequest');

const all = async (client) => (await sendRequest(client, '/transactions')).transactions;

module.exports = {
  all
};
