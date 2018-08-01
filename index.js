const config = require('config');
const AWS = require('aws-sdk');

const Client = require('./src/api/client');
const getSecret = require('./src/apiAccess/getSecret');
const listTransactions = require('./src/api/listTransactions');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const secretsClient = new AWS.SecretsManager({ region, endpoint });

(async () => {
  try {
    const monzoClient = new Client(
      await getSecret(secretsClient, config.get('accountIdSecretName')),
      await getSecret(secretsClient, config.get('accessTokenName'))
    );
    const transactions = await listTransactions(monzoClient, {
      since: new Date(2018, 6, 29),
      before: new Date(2018, 6, 30)
    });
    console.log(JSON.stringify(transactions));
  } catch (e) {
    console.log(e)
  }
})()