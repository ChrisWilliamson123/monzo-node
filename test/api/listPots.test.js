const listPots = require('../../src/api/listPots');
const sendRequest = require('../../src/api/sendRequest');

jest.mock('../../src/api/sendRequest')

const testPots = {
  "pots": [
    {
      "id": "pot_0000778xxfgh4iu8z83nWb",
      "name": "Savings",
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
}


describe('When listing pots', () => {
  it('should list pots that are currently active', async () => {
    sendRequest.mockImplementation(() => (testPots));
    expect(await listPots({})).toEqual([testPots.pots[0]]);
  });

  it('should list all pots when showDeleted argument is true', async () => {
    sendRequest.mockImplementation(() => (testPots));
    expect(await listPots({}, true)).toEqual(testPots.pots);
  });
});
