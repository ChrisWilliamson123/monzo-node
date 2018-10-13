const sendRequest = require('./sendRequest');

const shouldIgnoreTransaction = (transaction, budgetingPot) => {
  if ('metadata' in transaction) {
    const metadata = transaction.metadata;
    if (budgetingPot && budgetingPot.id === metadata.pot_id) {
      return true
    }
    if ('notes' in metadata && metadata.notes.toLowerCase().includes('ignore')) {
      return true
    }
  }
}

module.exports = async (client, pagination) => {
  const transactions = (await sendRequest.get(client, '/transactions', pagination)).transactions;
  const filtered = transactions.filter(transaction => !shouldIgnoreTransaction(transaction, client.budgetingPot));
  return filtered;
};
