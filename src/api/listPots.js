const sendRequest = require('./sendRequest');

module.exports = async (client, show_deleted=false) => {
  const allPots = (await sendRequest(client, '/pots')).pots;
  if (show_deleted) {
    return allPots;
  } else {
    return allPots.filter(pot => !pot.deleted);
  }
};
