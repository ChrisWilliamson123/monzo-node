const rp = require('request-promise');

const sendRequest = require('./../../src/api/sendRequest');
const getAccessToken = require('../../src/apiAccess/getAccessToken');

jest.mock('request-promise');
jest.mock('../../src/apiAccess/getAccessToken');

describe('When sending a request', () => {
  beforeEach(() => {
    getAccessToken.mockImplementation(() => Promise.resolve('testAccessToken'));
  })
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should send the request to the correct destination', async () => {
    try {
      rp.mockImplementation(() => Promise.resolve());
      await sendRequest({baseURL: 'http://baseurl.com'}, '/accounts');
      expect(rp.mock.calls[0][0].uri).toEqual(`http://baseurl.com/accounts`);
    } catch (error) {
      throw error
    }
  });

  it('should attach an authorization header with the access token', async () => {
    try {
      rp.mockImplementation(() => Promise.resolve());
      await sendRequest({baseURL: 'http://baseurl.com'}, '/accounts');
      expect(rp.mock.calls[0][0].headers).toEqual({
        Authorization: 'Bearer testAccessToken'
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
      const data = await sendRequest({baseURL: 'http://baseurl.com'}, '/accounts');
      expect(data).toEqual(mockResponse);
    } catch (error) {
      throw error;
    }
  })
})