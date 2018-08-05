const sendRequest = require('./sendRequest');
const getDedupeId = require('../utils/getDedupeId');

const performTransaction = async (accessToken, endpoint, amount, accountData) => {
  const finalData = Object.assign(
    {},
    { amount, 'dedupe_id': getDedupeId() },
    accountData  
  );

  const result = await sendRequest.put(accessToken, endpoint, finalData)
  return result;
}

const withdraw = async (client, potId, amount) => {
  return await performTransaction(
    client.accessToken,
    `/pots/${potId}/withdraw`,
    amount,
    { 'destination_account_id': client.accountId }
  );
}

const deposit = async (client, potId, amount) => {
  return await performTransaction(
    client.accessToken,
    `/pots/${potId}/deposit`,
    amount,
    { 'source_account_id': client.accountId }
  );
}

module.exports = {
  withdraw,
  deposit 
};
