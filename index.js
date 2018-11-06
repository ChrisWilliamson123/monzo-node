const config = require('config');
const AWS = require('aws-sdk');

const Client = require('./src/api/client');
const getSecret = require('./src/apiAccess/getSecret');
const getBudgetingRange = require('./src/utils/date/getBudgetingRange');
const getBudgetingPot = require('./src/api/getBudgetingPot');
const getNetSpend = require('./src/api/getNetSpend');
const getOverspendAmount = require('./src/api/getOverspendAmount');
const handleMonthlyOverspend = require('./src/handleMonthlyOverspend');
const handleBudgetingPot = require('./src/handleBudgetingPot');

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

    const netSpendYesterday = await getNetSpend(monzoClient, getBudgetingRange());
    const budgetInPence = config.get('dailyBudget') * 100;

    const saved = budgetInPence - netSpendYesterday
    const totalMonthlyOverspend = await getOverspendAmount(secretsClient);

    if (totalMonthlyOverspend > 0) {
      const savedAfterMonthlyOverspendHasBeenCalculated = await handleMonthlyOverspend(secretsClient, saved, totalMonthlyOverspend);
      if (savedAfterMonthlyOverspendHasBeenCalculated > 0) {
        await handleBudgetingPot(savedAfterMonthlyOverspendHasBeenCalculated, monzoClient, secretsClient);
      }
    } else {
      handleBudgetingPot(saved, monzoClient, secretsClient);
    }
  } catch (e) {
    console.log(e)
  }
})()
