const getTransactions = require('./listTransactions');
const today = require('../utils/today');

const getGrossSpend = async (client) => {
  const transactions = await getTransactions(client, { since: today()});
  
  const grossSpend = transactions
    .map(transaction => transaction.amount)
    .filter(amount => amount < 0)
    .reduce((total, amount) => total + amount, 0);
  
    return Math.abs(grossSpend);
}

module.exports = getGrossSpend;