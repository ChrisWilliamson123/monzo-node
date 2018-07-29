const rp = require('request-promise');
const getAccessToken = require('../../src/apiAccess/getAccessToken');
const storeRefreshToken = require('../../src/apiAccess/storeRefreshToken');

jest.mock('request-promise');
jest.mock('../../src/apiAccess/storeRefreshToken');

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
  });

  it('should call the monzo authentication url with correct refresh parameters', async () => {
    await getAccessToken({}, 'testRefreshToken', 'monzoClientId', 'monzoClientSecret');
    expect(rp.mock.calls[0][0]).toEqual({
      uri: 'https://api.monzo.com/oauth2/token',
      method: 'POST',
      body: {
        'grant_type': 'refresh_token',
        'client_id': 'monzoClientId',
        'client_secret': 'monzoClientSecret',
        'refresh_token': 'testRefreshToken',
      },
      json: true
    });
  });

  it('should call the save refresh token function with the new refresh token', async () => {
    storeRefreshToken.mockImplementation(() => {});
    await getAccessToken({}, 'testRefreshToken', 'monzoClientId', 'monzoClientSecret');
    expect(storeRefreshToken.mock.calls[0][1]).toEqual('new_refresh_token');
  });

  it('should return an access token', async () => {
    const accessToken = await getAccessToken({}, 'testRefreshToken', 'monzoClientId', 'monzoClientSecret');
    expect(accessToken).toEqual('test_access_token');
  });
})