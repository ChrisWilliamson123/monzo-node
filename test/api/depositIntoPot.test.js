const sendRequest = require('../../src/api/sendRequest');
const depositIntoPot = require('../../src/api/depositIntoPot');

describe('When depositing into a pot', () => {
  it('should call sendRequest with the correct parameters', async () => {
    const testClient = {
      accountId: 'testAccountId',
      accessToken: 'testAccessToken'
    }
    jest.spyOn(sendRequest, 'put').mockImplementation(() => {});
    jest.spyOn(Math, 'random').mockImplementation(() => 0.1);
    await depositIntoPot(testClient, 'testPotId', 100);
    expect(sendRequest.put.mock.calls[0]).toEqual([
      'testAccessToken',
      '/pots/testPotId/deposit',
      {
        'source_account_id': testClient.accountId,
        amount: 100,
        'dedupe_id': 'lllllllllm'
      }
    ])
  });
});