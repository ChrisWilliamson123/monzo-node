module.exports = async (secretsClient, secretName, refreshToken) => {
  try {
    await secretsClient.putSecretValue({
      SecretId: secretName,
      SecretString: refreshToken
    }).promise();
  } catch (error) {
    throw error;
  }
};