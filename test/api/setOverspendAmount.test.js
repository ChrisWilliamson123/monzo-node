const setOverspendAmount = require('../../src/api/setOverspendAmount');
const storeSecret = require('../../src/apiAccess/storeSecret');

jest.mock('../../src/apiAccess/storeSecret');

describe('Set overspend amount', () => {
    beforeAll(() => {
        storeSecret.mockImplementation(() => {});
    });

    afterEach(() => {
        storeSecret.mockReset();
    });

    it('should call storeSecret with the correct parameters', async () => {
        await setOverspendAmount(1000, {});
        expect(storeSecret.mock.calls[0][0]).toEqual({});
        expect(storeSecret.mock.calls[0][1]).toEqual('totalOverspend');
        expect(storeSecret.mock.calls[0][2]).toEqual(1000);
    });

    it('should call storeSecret with an amount of 0 if a negative number is passed', async () => {
        await setOverspendAmount(-500, {});
        expect(storeSecret.mock.calls[0][2]).toEqual(0);
    })
});
