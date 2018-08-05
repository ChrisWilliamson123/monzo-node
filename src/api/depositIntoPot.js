const sendRequest = require('./sendRequest');
const getDedupeId = require('../utils/getDedupeId');

const depositIntoPot = async (client, potId, amount) => {
  const result = await sendRequest.put(client.accessToken, `/pots/${potId}/deposit`, {
    'source_account_id': client.accountId,
    amount,
    'dedupe_id': getDedupeId()
  });

  return result;
}

module.exports = depositIntoPot;
