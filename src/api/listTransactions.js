const sendRequest = require('./sendRequest');

const shouldIgnoreTransaction = (transaction, potId) =>
  'metadata' in transaction && transaction.metadata.pot_id === potId

module.exports = async (client, pagination, potToIgnore) => {
  const transactions = (await sendRequest(client, '/transactions', pagination)).transactions;
  if (potToIgnore) {
    return transactions.filter(transaction => !shouldIgnoreTransaction(transaction, potToIgnore));
  }
  return transactions;
};
