const handleMonthlyOverspend = require('../src/handleMonthlyOverspend');
const setOverspendAmount = require('../src/api/setOverspendAmount');

jest.mock('../src/api/setOverspendAmount');

describe('Handle monthly overspend', () => {
  beforeAll(() => {
    setOverspendAmount.mockImplementation(() => {});
  });

  it('Should set the new overspend amount correctly', async () => {
    const totalOverspend = 10000;
    const saved = 1000;
    const secretsClient = {};
    await handleMonthlyOverspend(secretsClient, saved, totalOverspend);
    expect(setOverspendAmount.mock.calls[0][0]).toEqual(9000);
    expect(setOverspendAmount.mock.calls[0][1]).toEqual(secretsClient);
  });

  it('Should return 0 if the overspend amount is still positive.', async () => {
    const totalOverspend = 10000;
    const saved = 1000;
    const secretsClient = {};
    const newSaved = await handleMonthlyOverspend(secretsClient, saved, totalOverspend);
    expect(newSaved).toEqual(0);
  });

  it('Should return the new amout saved if the overspend amount has gone below 0.', async () => {
    const totalOverspend = 500;
    const saved = 1000;
    const secretsClient = {};
    const newSaved = await handleMonthlyOverspend(secretsClient, saved, totalOverspend);
    expect(newSaved).toEqual(500);
  });
});