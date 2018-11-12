const setOverspendAmount = require('./api/setOverspendAmount')
const toPounds = require('./utils/toPounds')

module.exports = async (secretsClient, saved, overspend) => {
  const newMonthlyOverspendAmount = overspend - saved;
  await setOverspendAmount(newMonthlyOverspendAmount, secretsClient);
  console.log(`Set new overspend amount to: £${toPounds(newMonthlyOverspendAmount)}`);
  // If we are still overspent for the month then return 0 as the total saved for the day.
  if (newMonthlyOverspendAmount > 0) {
    return 0;
  }
  return Math.abs(newMonthlyOverspendAmount);
};