const rp = require('request-promise');
const AWS = require('aws-sdk');
const config = require('config');

const getSecret = require('./getSecret');
const storeSecret = require('./storeSecret');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const secretsClient = new AWS.SecretsManager({ region, endpoint });

module.exports = async () => {
  try {
    const refreshTokenName = config.get('refreshTokenName')
    const clientSecret = await getSecret(secretsClient, config.get('clientSecretName'));
    const refreshToken = await getSecret(secretsClient, refreshTokenName);
    const params = {
      uri: 'https://api.monzo.com/oauth2/token',
      method: 'POST',
      form: {
        'grant_type': 'refresh_token',
        'client_id': config.get('clientId'),
        'client_secret': clientSecret,
        'refresh_token': refreshToken
      },
      json: true
    }
  
    const response = await rp(params);
    await storeSecret(secretsClient, refreshTokenName, response.refresh_token);
    await storeSecret(secretsClient, config.get('accessTokenName'), response.access_token);
  } catch (error) {
    throw error;
  }
}