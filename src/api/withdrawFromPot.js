const sendRequest = require('./sendRequest');
const getDedupeId = require('../utils/getDedupeId');

const withdrawFromPot = async (client, potId, amount) => {
  const result = await sendRequest.put(client.accessToken, `/pots/${potId}/withdraw`, {
    'destination_account_id': client.accountId,
    amount,
    'dedupe_id': getDedupeId()
  });

  return result;
}

module.exports = withdrawFromPot;
