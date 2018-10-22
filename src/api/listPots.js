const sendRequest = require('./sendRequest');

module.exports = async (client, show_deleted=false) => {
  const allPots = (await sendRequest.get(client, '/pots')).pots;
  return allPots.filter(pot => show_deleted || !pot.deleted);
};
