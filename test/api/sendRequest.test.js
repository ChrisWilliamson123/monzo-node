const rp = require('request-promise');

const sendRequest = require('./../../src/api/sendRequest');
const refreshAccessToken = require('../../src/apiAccess/refreshAccessToken');

jest.mock('request-promise');
jest.mock('../../src/apiAccess/refreshAccessToken');

describe('When sending a request', () => {
  beforeEach(() => {
    refreshAccessToken.init.mockImplementation(() => Promise.resolve('testAccessToken'));
    rp.mockImplementation(() => Promise.resolve());
  })
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('When sending a GET request', () => {
    it('should send the request to the correct destination', async () => {
      await sendRequest.get({}, '/accounts');
      expect(rp.mock.calls[0][0].uri).toEqual(`https://api.monzo.com/accounts`);
    });
  
    it('should attach an authorization header with the access token', async () => {
      await sendRequest.get({accessToken: 'testAccessToken'}, '/accounts');
      expect(rp.mock.calls[0][0].headers).toEqual({
        Authorization: 'Bearer testAccessToken'
      });
    });
  
    it('should attach the account id to the request', async () => {
      await sendRequest.get({ accessToken: 'testAccessToken', accountId: 'testAccountId' }, '/accounts');
      expect(rp.mock.calls[0][0].qs).toEqual({
        account_id: 'testAccountId'
      });
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
  
      rp.mockImplementation(() => Promise.resolve(mockResponse));
      const data = await sendRequest.get({accessToken: 'testAccessToken'}, '/accounts');
      expect(data).toEqual(mockResponse);
    });
  
    describe('Pagination', () => {
      it('should attach both pagination parameters to the querystring', async () => {
        await sendRequest.get({ accessToken: 'testAccessToken', accountId: 'testAccountId' }, '/accounts', {
          since: new Date(2018, 0, 1),
          before: new Date(2018, 0, 31)
        });
        expect(rp.mock.calls[0][0].qs).toEqual({
          account_id: 'testAccountId',
          since: '2018-01-01T00:00:00.000Z',
          before: '2018-01-31T00:00:00.000Z'
        });
      });
  
      it('should just attach the since parameter to the querystring', async () => {
        await sendRequest.get({ accessToken: 'testAccessToken', accountId: 'testAccountId' }, '/accounts', {
          since: new Date(2018, 0, 1)
        });
        expect(rp.mock.calls[0][0].qs).toEqual({
          account_id: 'testAccountId',
          since: '2018-01-01T00:00:00.000Z'
        });
      });
  
      it('should just attach the before parameter to the querystring', async () => {
        await sendRequest.get({ accessToken: 'testAccessToken', accountId: 'testAccountId' }, '/accounts', {
          before: new Date(2018, 0, 31)
        });
        expect(rp.mock.calls[0][0].qs).toEqual({
          account_id: 'testAccountId',
          before: '2018-01-31T00:00:00.000Z'
        });
      });
    });
  });

  describe('When sending a PUT request', () => {
    it('should send the request to the correct destination', async () => {
      await sendRequest.put('testAccessToken', '/deposit');
      expect(rp.mock.calls[0][0].uri).toEqual(`https://api.monzo.com/deposit`);
    });
  
    it('should attach an authorization header with the access token', async () => {
      await sendRequest.put('testAccessToken', '/accounts');
      expect(rp.mock.calls[0][0].headers).toEqual({
        Authorization: 'Bearer testAccessToken'
      });
    });

    it('should send a data object', async () => {
      await sendRequest.put('testAccessToken', '/accounts', { test_data: 'test' });
      expect(rp.mock.calls[0][0].form).toEqual({
        test_data: 'test'
      });
    });

    it('should return a JSON response', async () => {
      const mockResponse = {
        id: "pot_00009exampleP0tOxWb",
        name: "Wedding Fund",
        style: "beach_ball",
        balance: 550100,
        currency: "GBP",
        created: "2017-11-09T12:30:53.695Z",
        updated: "2018-02-26T07:12:04.925Z",
        deleted: false
      } 
  
      rp.mockImplementation(() => Promise.resolve(mockResponse));
      const data = await sendRequest.put('testAccessToken', '/deposit');
      expect(data).toEqual(mockResponse);
    });
  });
})