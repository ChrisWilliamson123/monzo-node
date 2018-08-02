const getGrossReceived = require('../../src/api/getGrossReceived');
const listTransactions = require('../../src/api/listTransactions');
const testTransactions = require('../fixtures/transactionsWithSpendsAndReceives.json');

jest.mock('../../src/api/listTransactions');

describe('When getting gross spend', () => {
  it('should return the correct amount received for the current day', async () => {
    listTransactions.mockImplementation(() => Promise.resolve(testTransactions));
    expect(await getGrossReceived({})).toEqual(1550);
  });

  it('should return zero if there have been no transactions on the day', async () => {
    listTransactions.mockImplementation(() => Promise.resolve([]));
    expect(await getGrossReceived({})).toEqual(0);
  });

  it('should return zero if there are only outgoing transactions', async () => {
    listTransactions.mockImplementation(() => Promise.resolve([{ amount: -1000 }, { amount: -2000 }]));
    expect(await getGrossReceived({})).toEqual(0);
  })
});
