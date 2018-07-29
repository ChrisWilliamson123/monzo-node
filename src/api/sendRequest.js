const rp = require('request-promise');
const getAccessToken = require('../apiAccess/getAccessToken');

const sendRequest = async (client, endpoint) => {
  const uri = `${client.baseURL}${endpoint}`;
  const accessToken = await getAccessToken();

  const requestParams = {
    uri,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  }

  return await rp(requestParams);
}

module.exports = sendRequest;