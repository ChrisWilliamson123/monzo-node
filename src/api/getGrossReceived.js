const listTransactions = require('../../src/api/listTransactions');
const today = require('../utils/today');

const getGrossReceived = async (client) => {
  const transactions = await listTransactions(client, { since: today() });

  const grossReceived = transactions
    .map(transaction => transaction.amount)
    .filter(amount => amount > 0)
    .reduce((total, amount) => total + amount, 0);
  
  return grossReceived;
}

module.exports = getGrossReceived;
