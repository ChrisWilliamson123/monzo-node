const setOverspendAmount = require('../../src/api/setOverspendAmount');
const storeSecret = require('../../src/apiAccess/storeSecret');

jest.mock('../../src/apiAccess/storeSecret');

describe('Set overspend amount', () => {
    it('should call storeSecret with the correct parameters', async () => {
        storeSecret.mockImplementation(() => {});
        await setOverspendAmount(1000, {});
        expect(storeSecret.mock.calls[0][0]).toEqual({});
        expect(storeSecret.mock.calls[0][1]).toEqual('totalOverspend');
        expect(storeSecret.mock.calls[0][2]).toEqual(1000);
    });
});
