const client = require('../../src/api/client');

describe('Monzo client', () => {
  it('should set the account ID and access token that is passed', () => {
    const testClient = new client('abc', 'testAccessToken');
    expect(testClient.accountId).toEqual('abc');
    expect(testClient.accessToken).toEqual('testAccessToken');
  });
});
