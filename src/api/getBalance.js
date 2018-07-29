const sendRequest = require('./sendRequest')

module.exports = async (client) => (await sendRequest(client, '/balance')).balance