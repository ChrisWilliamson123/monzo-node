'use strict';

const getSecret = require('../../src/apiAccess/getSecret');

describe('When retrieving a refresh token', () => {
  it('should return us a secret on a successful request', async () => {
    try {
      const secretsClientMock = {
        getSecretValue: () => ({
          promise: jest.fn().mockResolvedValue({
            SecretString: '{"secretKey1": "secretValue1", "secreyKey2": "secretValue2"}'
          })
        })
      }
      const secret = await getSecret(secretsClientMock, 'secretKey1');
      expect(secret).toEqual('secretValue1');
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
      await getSecret(secretsClientErrorMock);
      expect(1).toEqual(2);
    } catch (error) {
      expect(error).toEqual(secretsError);
    }
  });
})