const AWS = require('aws-sdk');

const Client = require('./src/api/client');
const getSecret = require('./src/apiAccess/getSecret');
// const listPots = require('./src/api/listPots');
const getGrossSpend = require('./src/api/getGrossSpend');
const getGrossReceived = require('./src/api/getGrossReceived');
const listTransactions = require('./src/api/listTransactions');
const getBudgetingRange = require('./src/utils/date/getBudgetingRange');
const getBudgetingPot = require('./src/api/getBudgetingPot');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const secretsClient = new AWS.SecretsManager({ region, endpoint });

(async () => {
  try {
    const monzoClient = new Client(
      await getSecret(secretsClient, 'accountId'),
      await getSecret(secretsClient, 'accessToken')
    );
    monzoClient.setBudgetingPot(await getBudgetingPot(monzoClient));
    console.log(await listTransactions(monzoClient, getBudgetingRange()));
    console.log(await getGrossSpend.inDateRange(monzoClient, getBudgetingRange()));
    console.log(await getGrossReceived.inDateRange(monzoClient, getBudgetingRange()));

  } catch (e) {
    console.log(e)
  }
})()