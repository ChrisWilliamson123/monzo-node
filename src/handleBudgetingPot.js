const potTransaction = require('./api/potTransaction')
const setOverspendAmount = require('./api/setOverspendAmount')

module.exports = async (amountSaved, monzoClient, budgetingPotBalance, secretsClient) => {
  if (amountSaved > 0) {
    await potTransaction.deposit(monzoClient, monzoClient.budgetingPot.id, amountSaved);
  } else {
    const amountOverspent = Math.abs(amountSaved);

    if (amountOverspent > budgetingPotBalance) {
      const outstandingOverspend = budgetingPotBalance - amountOverspent;
      await potTransaction.withdraw(monzoClient, monzoClient.budgetingPot.id, budgetingPotBalance);
      await setOverspendAmount(outstandingOverspend, secretsClient);
    } else {
      await potTransaction.withdraw(monzoClient, monzoClient.budgetingPot.id, amountOverspent);
    }
    

  }
};