const rp = require('request-promise');

const sendRequest = require('./../../src/api/sendRequest');
const refreshAccessToken = require('../../src/apiAccess/refreshAccessToken');

jest.mock('request-promise');
jest.mock('../../src/apiAccess/refreshAccessToken');

describe('When sending a request', () => {
  beforeEach(() => {
    refreshAccessToken.mockImplementation(() => Promise.resolve('testAccessToken'));
  })
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should send the request to the correct destination', async () => {
    try {
      rp.mockImplementation(() => Promise.resolve());
      await sendRequest({}, '/accounts');
      expect(rp.mock.calls[0][0].uri).toEqual(`https://api.monzo.com/accounts`);
    } catch (error) {
      throw error
    }
  });

  it('should attach an authorization header with the access token', async () => {
    try {
      rp.mockImplementation(() => Promise.resolve());
      await sendRequest({accessToken: 'testAccessToken'}, '/accounts');
      expect(rp.mock.calls[0][0].headers).toEqual({
        Authorization: 'Bearer testAccessToken'
      });
    } catch (error) {
      throw error;
    }
  });

  it('should attach the account id to the request', async () => {
    try {
      rp.mockImplementation(() => Promise.resolve());
      await sendRequest({ accessToken: 'testAccessToken', accountId: 'testAccountId' }, '/accounts');
      expect(rp.mock.calls[0][0].qs).toEqual({
        account_id: 'testAccountId'
      });
    } catch (error) {
      throw error;
    }
  });

  it('should return a JSON response', async () => {
    const mockResponse = {
      accounts: [
        {
          id: 'accountId',
          description: 'accDescription',
          created: 'creationDate'
        }
      ]
    }

    try {
      rp.mockImplementation(() => Promise.resolve(mockResponse));
      const data = await sendRequest({accessToken: 'testAccessToken'}, '/accounts');
      expect(data).toEqual(mockResponse);
    } catch (error) {
      throw error;
    }
  })
})