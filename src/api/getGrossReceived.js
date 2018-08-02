const getTransactions = require('./listTransactions');
const getTodaysDate = require('../utils/date/today');

const getReceived = transactions => transactions
  .map(transaction => transaction.amount)
  .filter(amount => amount > 0)
  .reduce((total, amount) => total + amount, 0);

const today = async (client) => {
  const transactions = await getTransactions(client, { since: getTodaysDate()});
  return getReceived(transactions);
}

const inDateRange = async (client, pagination) => {
  const transactions = await getTransactions(client, pagination);
  return getReceived(transactions);
}

module.exports = {
  today,
  inDateRange
};