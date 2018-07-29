'use strict';

module.exports = async (secretsManagerClient, secretName) => {
  try {
    const secretsPayload = { SecretId: secretName };
    const data = await secretsManagerClient.getSecretValue(secretsPayload).promise()
    return data.SecretString;
  } catch (error) {
    throw error;
  }
}