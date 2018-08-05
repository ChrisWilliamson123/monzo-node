const sendRequest = require('./sendRequest');

const depositIntoPot = async (client, potId, amount) => {
  await sendRequest.put(client.accessToken, `/pots/${potId}/deposit`, {
    'source_account_id': client.accountId,
    amount,
    'dedupe_id': 'abc'
  });
}

module.exports = depositIntoPot;
