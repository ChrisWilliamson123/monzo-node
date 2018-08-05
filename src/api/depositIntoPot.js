const sendRequest = require('./sendRequest');

const getDedupeId = () => Math.random().toString(36).replace(/[^a-z]+/g, '')

const depositIntoPot = async (client, potId, amount) => {
  await sendRequest.put(client.accessToken, `/pots/${potId}/deposit`, {
    'source_account_id': client.accountId,
    amount,
    'dedupe_id': getDedupeId()
  });
}

module.exports = depositIntoPot;
