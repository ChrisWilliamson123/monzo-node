const AWS = require('aws-sdk');
const config = require('config');
const MonzoClient = require('./src/api/client');
const getSecret = require('./src/apiAccess/getSecret');
const sendRequest = require('./src/api/sendRequest');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const secretsClient = new AWS.SecretsManager({ region, endpoint });
const accountIdName = config.get('accountIdSecretName');

(async () => {
  try {
    const accountId = await getSecret(secretsClient, accountIdName);
    const monzoClient = new MonzoClient(accountId, config.get('baseURL'));
    const balance = await sendRequest(monzoClient, '/balance', {
      clientId: config.get('clientId'),
      clientSecret: await getSecret(secretsClient, config.get('clientSecretName')),
      refreshTokenName: config.get('refreshTokenName')
    }, secretsClient);
    console.log(typeof balance);
  } catch (e) {
    console.log(e)
  }
})()