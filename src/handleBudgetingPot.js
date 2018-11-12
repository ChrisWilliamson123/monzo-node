const potTransaction = require('./api/potTransaction');
const setOverspendAmount = require('./api/setOverspendAmount');
const toPounds = require('./utils/toPounds');

module.exports = async (amountSaved, monzoClient, secretsClient) => {
  if (amountSaved > 0) {
    await potTransaction.deposit(monzoClient, monzoClient.budgetingPot.id, amountSaved);
    console.log(`Deposited £${toPounds(amountSaved)} into budgeting pot`);
  } else {
    const amountOverspent = Math.abs(amountSaved);
    console.log(`Overspent by £${toPounds(amountOverspent)}`);
    if (amountOverspent > monzoClient.budgetingPot.balance) {
      const outstandingOverspend = Math.abs(monzoClient.budgetingPot.balance - amountOverspent);
      await potTransaction.withdraw(monzoClient, monzoClient.budgetingPot.id, monzoClient.budgetingPot.balance);
      console.log(`Emptied budgeting pot (£${toPounds(monzoClient.budgetingPot.balance)})`);
      await setOverspendAmount(outstandingOverspend, secretsClient);
      console.log(`Set total overspend to £${toPounds(outstandingOverspend)}`);
    } else {
      await potTransaction.withdraw(monzoClient, monzoClient.budgetingPot.id, amountOverspent);
      console.log(`Withdrawn £${toPounds(amountOverspent)} from budgeting pot`);
    }
  }
};