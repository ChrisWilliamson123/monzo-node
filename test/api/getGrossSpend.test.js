const getGrossSpend = require('../../src/api/getGrossSpend');
const listTransactions = require('../../src/api/listTransactions');
const testTransactions = require('../fixtures/transactionsWithSpendsAndReceives.json');

jest.mock('../../src/api/listTransactions');

describe('When getting gross spend', () => {
  afterEach(() => {
    jest.clearAllMocks()
  });
  
  describe('Today', () => {
    it('should return the correct spend for the current day', async () => {
      listTransactions.mockImplementation(() => Promise.resolve(testTransactions));
      expect(await getGrossSpend.today({})).toEqual(900);
    });
  
    it('should return zero if there have been no transactions on the day', async () => {
      listTransactions.mockImplementation(() => Promise.resolve([]));
      expect(await getGrossSpend.today({})).toEqual(0);
    });
  
    it('should return zero if there are only incoming transactions', async () => {
      listTransactions.mockImplementation(() => Promise.resolve([{ amount: 1000 }, { amount: 2000 }]));
      expect(await getGrossSpend.today({})).toEqual(0);
    })
  });

  describe('In date range', () => {
    it('should pass the correct pagination object to listTransactions', async () => {
      listTransactions.mockImplementation(() => Promise.resolve([]));
      const since = new Date(2018, 0, 1);
      const before = new Date(2018, 0, 3);
      await getGrossSpend.inDateRange({}, { since, before });
      expect(listTransactions.mock.calls[0][1]).toEqual({ since, before });
    });
  });
});