const config = require('config');
const AWS = require('aws-sdk');

const Client = require('./src/api/client');
const getSecret = require('./src/apiAccess/getSecret');
const getBudgetingRange = require('./src/utils/date/getBudgetingRange');
const getBudgetingPot = require('./src/api/getBudgetingPot');
const potTransaction = require('./src/api/potTransaction');
const getNetSpend = require('./src/api/getNetSpend');
const toPounds = require('./src/utils/toPounds');

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
    if (saved > 0) {
      console.log(`You have saved £${toPounds(saved)}. Depositing into budgeting pot...`);
      potTransaction.deposit(monzoClient, monzoClient.budgetingPot.id, saved);
    } else if (saved == 0) {
      console.log(`You have broke even today.`);
      return;
    } else {
      console.log(`You have gone over budget by £${toPounds(saved)}. Withdrawing from budgeting pot...`);
      potTransaction.withdraw(monzoClient, monzoClient.budgetingPot.id, saved);
    }
    
    console.log(`Transaction complete`);
  } catch (e) {
    console.log(e)
  }
})()