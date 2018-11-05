const setOverspendAmount = require('./api/setOverspendAmount')

module.exports = async (secretsClient, saved, overspend) => {
  const newOverspendAmount = overspend - saved;
  await setOverspendAmount(newOverspendAmount, secretsClient);
  console.log(`Set new overspend amount: ${newOverspendAmount}`);
  if (newOverspendAmount > 0) {
    return 0;
  }
  return Math.abs(newOverspendAmount);
};