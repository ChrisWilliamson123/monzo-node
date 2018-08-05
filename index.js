const config = require('config');
const AWS = require('aws-sdk');

const Client = require('./src/api/client');
const getSecret = require('./src/apiAccess/getSecret');
// const listPots = require('./src/api/listPots');
// const getGrossSpend = require('./src/api/getGrossSpend');
// const getGrossReceived = require('./src/api/getGrossReceived');
// const potTransaction = require('./src/api/potTransaction');
// const getBudgetingRange = require('./src/utils/date/getBudgetingRange');
const getBudgetingPot = require('./src/api/getBudgetingPot');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const secretsClient = new AWS.SecretsManager({ region, endpoint });

(async () => {
  try {
    const monzoClient = new Client(
      await getSecret(secretsClient, config.get('accountIdSecretName')),
      await getSecret(secretsClient, config.get('accessTokenName'))
    );
    monzoClient.setBudgetingPot(await getBudgetingPot(monzoClient));

  } catch (e) {
    console.log(e)
  }
})()