const sendRequest = require('./sendRequest');

const getDedupeId = () => Math.random().toString(36).replace(/[^a-z]+/g, '')

const withdrawFromPot = async (client, potId, amount) => {
  const result = await sendRequest.put(client.accessToken, `/pots/${potId}/withdraw`, {
    'destination_account_id': client.accountId,
    amount,
    'dedupe_id': getDedupeId()
  });

  return result;
}

module.exports = withdrawFromPot;
