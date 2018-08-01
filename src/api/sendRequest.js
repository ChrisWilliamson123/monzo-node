const rp = require('request-promise');

const buildPaginationObject = (pagination) => {
  const since = pagination.since ? pagination.since.toISOString() : undefined
  const before = pagination.before ? pagination.before.toISOString() : undefined

  return Object.assign(
    {},
    since ? { since } : null,
    before ? { before } : null
  );
};

const sendRequest = async (client, endpoint, pagination) => {
  const uri = `https://api.monzo.com${endpoint}`;

  const requestParams = {
    uri,
    method: 'GET',
    qs: Object.assign(
      {},
      { account_id: client.accountId },
      pagination ? buildPaginationObject(pagination) : null
    ),
    headers: {
      Authorization: `Bearer ${client.accessToken}`
    },
    json: true
  }

  return await rp(requestParams);
}

module.exports = sendRequest;