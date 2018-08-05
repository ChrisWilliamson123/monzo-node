const sendRequest = require('../../src/api/sendRequest');
const potTransaction = require('../../src/api/potTransaction');
const getDedupeId = require('../../src/utils/getDedupeId');

jest.mock('../../src/utils/getDedupeId');

describe('When performing a pot transaction', () => {
  const testClient = {
    accountId: 'testAccountId',
    accessToken: 'testAccessToken'
  };
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

  beforeAll(() => {
    jest.spyOn(sendRequest, 'put').mockImplementation(() => mockResponse);
    getDedupeId.mockImplementation(() => 'dedupeId')
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When withdrawing from a pot', () => {
    it('should call sendRequest with the correct parameters', async () => {
      await potTransaction.withdraw(testClient, 'testPotId', 100);
      expect(sendRequest.put.mock.calls[0]).toEqual([
        'testAccessToken',
        '/pots/testPotId/withdraw',
        {
          'destination_account_id': testClient.accountId,
          amount: 100,
          'dedupe_id': 'dedupeId'
        }
      ]);
    });
  
    it('should return a JSON object', async () => {
      const result = await potTransaction.withdraw(testClient, 'testPotId', 100);
      expect(result).toEqual(mockResponse);
    });
  });
  
  describe('When depositing into a pot', () => {
    it('should call sendRequest with the correct parameters', async () => {
      await potTransaction.deposit(testClient, 'testPotId', 100);
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
      const result = await potTransaction.deposit(testClient, 'testPotId', 100);
      expect(result).toEqual(mockResponse);
    });
  });
});
