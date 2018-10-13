const rp = require('request-promise');
const AWS = require('aws-sdk');
const config = require('config');

const getSecret = require('./getSecret');
const storeSecret = require('./storeSecret');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const secretsClient = new AWS.SecretsManager({ region, endpoint });

module.exports.init = async () => {
  try {
    const clientSecret = await getSecret(secretsClient, 'clientSecret');
    const refreshToken = await getSecret(secretsClient, 'refreshToken');
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
    await storeSecret(secretsClient, 'refreshToken', response.refresh_token);
    await storeSecret(secretsClient, 'accessToken', response.access_token);
    console.log('Tokens have been refreshed.')
  } catch (error) {
    throw error;
  }
}