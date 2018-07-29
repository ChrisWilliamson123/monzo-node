const getBalance = require('../../src/api/getBalance');
const sendRequest = require('../../src/api/sendRequest');

jest.mock('../../src/api/sendRequest')

describe('Get balance', () => {
  it('should get the user\'s balance in pence', async () => {
    sendRequest.mockImplementation(() => ({
      balance: 35430,
      total_balance: 48084,
      currency: 'GBP',
      spend_today: -570,
      local_currency: '',
      local_exchange_rate: 0,
      local_spend: [ { spend_today: -570, currency: 'GBP' } ] })
    )

    expect(await getBalance({})).toEqual(35430);
  })
})