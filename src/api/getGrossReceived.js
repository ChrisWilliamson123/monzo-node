const getTransactions = require('./listTransactions');
const getTodaysDate = require('../utils/date/today');

const getReceivedAmountFromTransactions = transactions => transactions
  .map(transaction => transaction.amount)
  .filter(amount => amount > 0 && amount <= 50000)
  .reduce((total, amount) => total + amount, 0);

const today = async (client) => {
  const transactions = await getTransactions(client, { since: getTodaysDate()});
  return getReceivedAmountFromTransactions(transactions);
}

const inDateRange = async (client, pagination) => {
  const transactions = await getTransactions(client, pagination);
  return getReceivedAmountFromTransactions(transactions);
}

module.exports = {
  today,
  inDateRange,
  getReceivedAmountFromTransactions
};