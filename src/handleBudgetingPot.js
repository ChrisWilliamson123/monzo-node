const potTransaction = require('./api/potTransaction')
const setOverspendAmount = require('./api/setOverspendAmount')

module.exports = async (amountSaved, monzoClient, secretsClient) => {
  if (amountSaved > 0) {
    await potTransaction.deposit(monzoClient, monzoClient.budgetingPot.id, amountSaved);
  } else {
    const amountOverspent = Math.abs(amountSaved);

    if (amountOverspent > monzoClient.budgetingPot.balance) {
      const outstandingOverspend = monzoClient.budgetingPot.balance - amountOverspent;
      await potTransaction.withdraw(monzoClient, monzoClient.budgetingPot.id, monzoClient.budgetingPot.balance);
      await setOverspendAmount(outstandingOverspend, secretsClient);
    } else {
      await potTransaction.withdraw(monzoClient, monzoClient.budgetingPot.id, amountOverspent);
    }
    

  }
};