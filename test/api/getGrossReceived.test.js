const getGrossReceived = require('../../src/api/getGrossReceived');
const listTransactions = require('../../src/api/listTransactions');
const testTransactions = require('../fixtures/transactionsWithSpendsAndReceives.json');

jest.mock('../../src/api/listTransactions');

describe('When getting gross spend', () => {
  afterEach(() => {
    jest.clearAllMocks()
  });

  describe('Today', () => {
    it('should return the correct amount received for the current day', async () => {
      listTransactions.mockImplementation(() => Promise.resolve(testTransactions));
      expect(await getGrossReceived.today({})).toEqual(1550);
    });
  
    it('should return zero if there have been no transactions on the day', async () => {
      listTransactions.mockImplementation(() => Promise.resolve([]));
      expect(await getGrossReceived.today({})).toEqual(0);
    });
  
    it('should return zero if there are only outgoing transactions', async () => {
      listTransactions.mockImplementation(() => Promise.resolve([{ amount: -1000 }, { amount: -2000 }]));
      expect(await getGrossReceived.today({})).toEqual(0);
    });
  });

  describe('In date range', () => {
    it('should pass the correct pagination object to listTransactions', async () => {
      listTransactions.mockImplementation(() => Promise.resolve([]));
      const since = new Date(2018, 0, 1);
      const before = new Date(2018, 0, 3);
      await getGrossReceived.inDateRange({}, { since, before });
      expect(listTransactions.mock.calls[0][1]).toEqual({ since, before });
    });
  });
});
