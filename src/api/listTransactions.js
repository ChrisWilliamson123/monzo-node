const sendRequest = require('./sendRequest');

const shouldIgnoreTransaction = (transaction, potId) =>
  'metadata' in transaction && transaction.metadata.pot_id === potId

module.exports = async (client, pagination) => {
  const transactions = (await sendRequest.get(client, '/transactions', pagination)).transactions;
  if (client.budgetingPot) {
    return transactions.filter(transaction => !shouldIgnoreTransaction(transaction, client.budgetingPot.id));
  }
  return transactions;
};
