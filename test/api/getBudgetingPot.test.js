const getBudgetingPot = require('../../src/api/getBudgetingPot');
const listPots = require('../../src/api/listPots');

jest.mock('../../src/api/listPots');

describe('When getting the budgeting pot', () => {
  it('should retrieve the pot with the name pulled from config', async () => {
    const mockPots = [
      {
        "id": "pot_0000778xxfgh4iu8z83nWb",
        "name": "Budgeting",
        "style": "beach_ball",
        "balance": 133700,
        "currency": "GBP",
        "created": "2017-11-09T12:30:53.695Z",
        "updated": "2017-11-09T12:30:53.695Z",
        "deleted": false
      },
      {
        "id": "pot_anotherTestPot",
        "name": "Savings 2",
        "style": "umbrella",
        "balance": 1234567,
        "currency": "GBP",
        "created": "2017-11-09T12:30:53.695Z",
        "updated": "2017-11-09T12:30:53.695Z",
        "deleted": true
      }
    ]
    listPots.mockImplementation(() => mockPots);
    const pot = await getBudgetingPot({});
    expect(pot).toEqual(mockPots[0]);
  });
})