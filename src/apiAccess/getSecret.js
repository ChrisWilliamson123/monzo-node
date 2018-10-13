'use strict';

module.exports = async (secretsManagerClient, secretName) => {
  try {
    const secretsPayload = { SecretId: 'MonzoSecrets' };
    const data = await secretsManagerClient.getSecretValue(secretsPayload).promise()
    const parsedData = JSON.parse(data.SecretString)
    return parsedData[secretName];
  } catch (error) {
    throw error;
  }
}