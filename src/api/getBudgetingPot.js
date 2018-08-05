const config = require('config');
const listPots = require('./listPots');

module.exports = async (client) => {
  const pots = await listPots(client);
  return pots.filter(p => p.name === config.get('budgetingPotName'))[0];
};