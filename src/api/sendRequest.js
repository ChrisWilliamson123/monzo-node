const rp = require('request-promise');

const sendRequest = async (client, endpoint) => {
  const uri = `https://api.monzo.com${endpoint}`;

  const requestParams = {
    uri,
    method: 'GET',
    qs: {
      account_id: client.accountId
    },
    headers: {
      Authorization: `Bearer ${client.accessToken}`
    },
    json: true
  }

  return await rp(requestParams);
}

module.exports = sendRequest;