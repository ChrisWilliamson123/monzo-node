const listTransactions = require('../../src/api/listTransactions');
const sendRequest = require('../../src/api/sendRequest');

jest.mock('../../src/api/sendRequest')

const testTransactions = {
  "transactions": [
    {
      "account_balance": 13013,
      "amount": -510,
      "created": "2015-08-22T12:20:18Z",
      "currency": "GBP",
      "description": "THE DE BEAUVOIR DELI C LONDON GBR",
      "id": "tx_00008zIcpb1TB4yeIFXMzx",
      "merchant": "merch_00008zIcpbAKe8shBxXUtl",
      "metadata": {},
      "notes": "Salmon sandwich",
      "is_load": false,
      "settled": "2015-08-23T12:20:18Z",
      "category": "eating_out"
    },
    {
      "account_balance": 12334,
      "amount": -679,
      "created": "2015-08-23T16:15:03Z",
      "currency": "GBP",
      "description": "VUE BSL LTD ISLINGTON GBR",
      "id": "tx_00008zL2INM3xZ41THuRF3",
      "merchant": "merch_00008z6uFVhVBcaZzSQwCX",
      "metadata": {},
      "notes": "",
      "is_load": false,
      "settled": "2015-08-24T16:15:03Z",
      "category": "eating_out"
    },
  ]
}

describe('When listing tranactions', () => {
  beforeAll(() => {
    sendRequest.mockImplementation(() => (testTransactions));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all transactions', async () => {
    sendRequest.mockImplementation(() => (testTransactions));

    expect(await listTransactions({})).toEqual(testTransactions.transactions);
  });

  it('should pass the pagination oject through to sendRequest', async () => {
    const pagination = {
      since: new Date(2018, 0, 1),
      before: new Date(2018, 0, 31),
    }
    await listTransactions({}, pagination);
    expect(sendRequest.mock.calls[0][2]).toEqual(pagination);
  });
})