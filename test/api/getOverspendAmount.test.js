const getOverspendAmount = require('../../src/api/getOverspendAmount');
const getSecret = require('../../src/apiAccess/getSecret');

jest.mock('../../src/apiAccess/getSecret');

describe('Get overspend amount', () => {
    it('should call getSecret with the correct parameters', async () => {
        getSecret.mockImplementation(() => {});
        await getOverspendAmount({});
        expect(getSecret.mock.calls[0][0]).toEqual({});
        expect(getSecret.mock.calls[0][1]).toEqual('totalOverspend');
    });
});
