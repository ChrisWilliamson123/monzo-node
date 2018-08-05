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

const buildBasicParams = (method, endpoint, accessToken) => ({
  uri: `https://api.monzo.com${endpoint}`,
  method,
  headers: {
    Authorization: `Bearer ${accessToken}`
  },
  json: true
});

const buildQueryString = (accountId, pagination) => ({
  qs: Object.assign(
    {},
    { account_id: accountId },
    pagination ? buildPaginationObject(pagination) : null
  )
})

const get = async (client, endpoint, pagination) => {
  const basicParams = buildBasicParams('GET', endpoint, client.accessToken)
  
  const fullParams = Object.assign(
    {},
    basicParams,
    buildQueryString(client.accountId, pagination)
  );

  return await rp(fullParams);
};

const put = async (accessToken, endpoint, data) => {
  const basicParams = buildBasicParams('PUT', endpoint, accessToken);
  
  const fullParams = Object.assign({}, basicParams, { form: data });

  return await rp(fullParams);
};

module.exports = {
  get,
  put
}