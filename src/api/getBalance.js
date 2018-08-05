const sendRequest = require('./sendRequest')

module.exports = async (client) => (await sendRequest.get(client, '/balance')).balance