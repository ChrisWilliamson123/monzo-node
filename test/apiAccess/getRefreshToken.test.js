'use strict';

const getRefreshToken = require('../../src/apiAccess/getRefreshToken');

describe('When retrieving a refresh token', () => {
  it('should return us a token on a successful request', async () => {
    try {
      const secretsClientMock = {
        getSecretValue: () => ({
          promise: jest.fn().mockResolvedValue({
            SecretString: 'REFRESH_TOKEN'
          })
        })
      }
      const token = await getRefreshToken(secretsClientMock);
      expect(token).toEqual('REFRESH_TOKEN');
    } catch (error) {
      throw error;
    }
  });

  it('should throw an error if the request fails', async () => {
    const secretsError = new Error('SECRETS REQUEST FAILED')
    const secretsClientErrorMock = {
      getSecretValue: () => ({
        promise: jest.fn().mockRejectedValue(secretsError)
      })
    }

    try {
      await getRefreshToken(secretsClientErrorMock);
      expect(1).toEqual(2);
    } catch (error) {
      expect(error).toEqual(secretsError);
    }
  });
})