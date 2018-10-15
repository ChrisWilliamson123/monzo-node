const getNetSpend = require('../../src/api/getNetSpend');
const listTransactions = require('../../src/api/listTransactions');
const testTransactions = require('../fixtures/transactionsWithSpendsAndReceives.json');
const getBudgetingRange = require('../../src/utils/date/getBudgetingRange');

jest.mock('../../src/api/listTransactions');

describe('Get amount saved', () => {
  listTransactions.mockImplementation(() => Promise.resolve(testTransactions));
  it('should get the amount the user has saved in pence', async () => {
    const dateRange = getBudgetingRange();
    expect(await getNetSpend({}, dateRange)).toEqual(-650);
  });
})