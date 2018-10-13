const rp = require('request-promise');
const refreshAccessToken = require('../../src/apiAccess/refreshAccessToken');
const storeSecret = require('../../src/apiAccess/storeSecret');
const getSecret = require('../../src/apiAccess/getSecret');

jest.mock('request-promise');
jest.mock('../../src/apiAccess/storeSecret');
jest.mock('../../src/apiAccess/getSecret');

describe('When getting an access token', () => {
  beforeAll(() => {
    rp.mockImplementation(() => ({
      'access_token': 'test_access_token',
      'client_id': 'test_client_id',
      'expires_in': 21600,
      'refresh_token': 'new_refresh_token',
      'token_type': 'Bearer',
      'user_id': 'test_user_id'
    }));
    getSecret
      .mockImplementationOnce(() => 'testClientSecret')
      .mockImplementationOnce(() => 'testRefreshToken')
    storeSecret.mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  })

  it('should call the monzo authentication url with correct refresh parameters', async () => {
    await refreshAccessToken.init();
    expect(rp.mock.calls[0][0]).toEqual({
      uri: 'https://api.monzo.com/oauth2/token',
      method: 'POST',
      form: {
        'grant_type': 'refresh_token',
        'client_id': 'testClientId',
        'client_secret': 'testClientSecret',
        'refresh_token': 'testRefreshToken',
      },
      json: true
    });
  });

  it('should call the store token function with the new refresh token', async () => {
    await refreshAccessToken.init();
    expect(storeSecret.mock.calls[0][1]).toEqual('refreshToken');
    expect(storeSecret.mock.calls[0][2]).toEqual('new_refresh_token');
  });

  it('should store the new access token', async () => {
    await refreshAccessToken.init();
    expect(storeSecret.mock.calls[1][1]).toEqual('accessToken');
    expect(storeSecret.mock.calls[1][2]).toEqual('test_access_token');
  });
})