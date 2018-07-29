const AWS = require('aws-sdk');
const config = require('config');
const getSecret = require('./src/apiAccess/getSecret');
const getAccessToken = require('./src/apiAccess/getAccessToken');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const client = new AWS.SecretsManager({ region, endpoint });
const refreshTokenName = config.get('refreshTokenName');
const clientSecretName = config.get('clientSecretName');
const clientId = config.get('clientId');

(async () => {
  try {
    const refreshToken = await getSecret(client, refreshTokenName);
    console.log(refreshToken);
    const clientSecret = await getSecret(client, clientSecretName);
    const accessToken = await getAccessToken(clientId, clientSecret, refreshToken, client, refreshTokenName);
    console.log(accessToken);
    const newRefreshToken = await getSecret(client, refreshTokenName);
    console.log(newRefreshToken);
  } catch (e) {
    console.log(e)
  }
})()