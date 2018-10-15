const listTransactions = require('./listTransactions');
const { getReceivedAmountFromTransactions } = require('./getGrossReceived');
const { getSpendAmountFromTransactions } = require('./getGrossSpend');


module.exports = async (client, dateRange) => {
  const transactions = await listTransactions(client, dateRange);
  const received = getReceivedAmountFromTransactions(transactions);
  const spent = getSpendAmountFromTransactions(transactions);
  return spent - received;  
}