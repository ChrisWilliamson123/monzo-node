const listTransactions = require('../../src/api/listTransactions');
const sendRequest = require('../../src/api/sendRequest');

const testTransactions = {
  "transactions": [
    {
      amount: -510,
      id: "tx_00008zIcpb1TB4yeIFXMzx",
    },
    {
      amount: -679,
      id: "tx_00008zL2INM3xZ41THuRF3",
    },
    { 
      id: 'tx_00009ZKOFnXZobfO0iGVNp',
      amount: 1950,
      metadata: { 
        pot_id: 'budgeting_pot',
      },
    }
  ]
}

describe('When listing tranactions', () => {
  beforeAll(() => {
    jest.spyOn(sendRequest, 'get').mockImplementation(() => (testTransactions));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should list all transactions', async () => {
    jest.spyOn(sendRequest, 'get').mockImplementation(() => (testTransactions));

    expect(await listTransactions({})).toEqual(testTransactions.transactions);
  });

  it('should pass the pagination oject through to sendRequest', async () => {
    const pagination = {
      since: new Date(2018, 0, 1),
      before: new Date(2018, 0, 31),
    }
    await listTransactions({}, pagination);
    expect(sendRequest.get.mock.calls[0][2]).toEqual(pagination);
  });

  it('should remove pot transactions with the id that is passed', async () => {
    const transactions = await listTransactions({}, undefined, 'budgeting_pot');
    const expected = testTransactions.transactions;
    expect(transactions).toEqual([expected[0], expected[1]]);
  });
})