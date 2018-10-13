const storeSecret = require('../../src/apiAccess/storeSecret');

describe('When storing a new secret', () => {
  it('should call the aws secrets manager with the correct parameters', async () => {
    const secretsClientMock = {
      putSecretValue: jest.fn().mockImplementation(() => ({
        promise: () => Promise.resolve()
      })),
      getSecretValue: () => ({
        promise: jest.fn().mockResolvedValue({
          SecretString: '{"secretKey1": "secretValue1", "secretKey2": "secretValue2"}'
        })
      })
    };
    try {
      await storeSecret(secretsClientMock, 'secretKey2', 'secretValue2Replacement');
      expect(secretsClientMock.putSecretValue.mock.calls[0][0]).toEqual({
        SecretId: 'MonzoSecrets',
        SecretString: '{"secretKey1":"secretValue1","secretKey2":"secretValue2Replacement"}'
      });
    } catch (error) {
      throw error;
    }
  });

  it('should throw an error if our update fails', async () => {
    const awsError = new Error('Update failed');
    const secretsClientMock = {
      putSecretValue: () => ({
        promise: () => Promise.reject(awsError)
      }),
      getSecretValue: () => ({
        promise: jest.fn().mockResolvedValue({
          SecretString: '{"secretKey1": "secretValue1", "secreyKey2": "secretValue2"}'
        })
      })
    };
    try {
      await storeSecret(secretsClientMock, 'testSecretId', 'new_refresh_token');
      expect(1).toEqual(2)
    } catch (error) {
      expect(error).toEqual(awsError);
    }
  });
})