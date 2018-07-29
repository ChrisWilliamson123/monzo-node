const rp = require('request-promise');
const getAccessToken = require('../apiAccess/getAccessToken');

const sendRequest = async (client, endpoint, { clientId, clientSecret, refreshTokenName }, secretsApiClient) => {
  const uri = `${client.baseURL}${endpoint}`;
  const accessToken = await getAccessToken(clientId, clientSecret, secretsApiClient, refreshTokenName);

  const requestParams = {
    uri,
    method: 'GET',
    qs: {
      account_id: client.accountId
    },
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  }

  return await rp(requestParams);
}

module.exports = sendRequest;