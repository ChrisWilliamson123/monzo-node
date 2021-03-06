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
    },
    {
      id: 'tx_00009ZKOFnXZobfO0abcde',
      amount: 200,
      metadata: {
        notes: 'ignore this transaction'
      }
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
    const expected = testTransactions.transactions;
    expect(await listTransactions({})).toEqual([expected[0], expected[1], expected[2]]);
  });

  it('should pass the pagination oject through to sendRequest', async () => {
    const pagination = {
      since: new Date(2018, 0, 1),
      before: new Date(2018, 0, 31),
    }
    await listTransactions({}, pagination);
    expect(sendRequest.get.mock.calls[0][2]).toEqual(pagination);
  });

  it('should remove budgeting pot transactions', async () => {
    const transactions = await listTransactions({ budgetingPot: { id: 'budgeting_pot' }});
    const expected = testTransactions.transactions;
    expect(transactions).toEqual([expected[0], expected[1]]);
  });

  it("should remove transactions that have 'ignore' in their notes", async () => {
    const transactions = await listTransactions({});
    const expected = testTransactions.transactions;
    expect(transactions).toEqual([expected[0], expected[1], expected[2]]);
  });
})