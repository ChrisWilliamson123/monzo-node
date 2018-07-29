const client = require('../../src/api/client');

describe('Monzo client', () => {
  it('should set the account ID and baseURL that is passed', () => {
    const testClient = new client('abc', 'http://baseurl.com');
    expect(testClient.accountId).toEqual('abc');
    expect(testClient.baseURL).toEqual('http://baseurl.com');
  })
})