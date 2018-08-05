const sendRequest = require('../../src/api/sendRequest');
const depositIntoPot = require('../../src/api/depositIntoPot');
const getDedupeId = require('../../src/utils/getDedupeId');

jest.mock('../../src/utils/getDedupeId');

describe('When depositing into a pot', () => {
  it('should call sendRequest with the correct parameters', async () => {
    const testClient = {
      accountId: 'testAccountId',
      accessToken: 'testAccessToken'
    }
    jest.spyOn(sendRequest, 'put').mockImplementation(() => {});
    getDedupeId.mockImplementation(() => 'dedupeId');
    await depositIntoPot(testClient, 'testPotId', 100);
    expect(sendRequest.put.mock.calls[0]).toEqual([
      'testAccessToken',
      '/pots/testPotId/deposit',
      {
        'source_account_id': testClient.accountId,
        amount: 100,
        'dedupe_id': 'dedupeId'
      }
    ]);
  });

  it('should return a JSON object', async () => {
    const testClient = {
      accountId: 'testAccountId',
      accessToken: 'testAccessToken'
    }
    const mockResponse = {
      id: "pot_00009exampleP0tOxWb",
      name: "Wedding Fund",
      style: "beach_ball",
      balance: 550100,
      currency: "GBP",
      created: "2017-11-09T12:30:53.695Z",
      updated: "2018-02-26T07:12:04.925Z",
      deleted: false
    };
    jest.spyOn(sendRequest, 'put').mockImplementation(() => mockResponse);
    const result = await depositIntoPot(testClient, 'testPotId', 100);
    expect(result).toEqual(mockResponse);
  });
});