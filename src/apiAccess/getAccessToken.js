const rp = require('request-promise');
const storeRefreshToken = require('./storeRefreshToken');
const getSecret = require('./getSecret');

module.exports = async (clientId, clientSecret, secretsApiClient, refreshTokenName) => {
  try {
    const refreshToken = await getSecret(secretsApiClient, refreshTokenName)
    const params = {
      uri: 'https://api.monzo.com/oauth2/token',
      method: 'POST',
      form: {
        'grant_type': 'refresh_token',
        'client_id': clientId,
        'client_secret': clientSecret,
        'refresh_token': refreshToken
      },
      json: true
    }
  
    const response = await rp(params);
    await storeRefreshToken(secretsApiClient, refreshTokenName, response.refresh_token);
    return(response.access_token);
  } catch (error) {
    throw error;
  }
}