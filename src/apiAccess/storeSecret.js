module.exports = async (secretsClient, secretName, secretValue) => {
  try {
    await secretsClient.putSecretValue({
      SecretId: secretName,
      SecretString: secretValue
    }).promise();
  } catch (error) {
    throw error;
  }
};