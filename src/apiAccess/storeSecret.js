module.exports = async (secretsClient, secretName, secretValue) => {
  try {
    const secretsPayload = { SecretId: 'MonzoSecrets' };
    const allSecretsPayload = await secretsClient.getSecretValue(secretsPayload).promise()
    const allSecrets = JSON.parse(allSecretsPayload.SecretString)
    const newSecrets = Object.assign({}, allSecrets, { [secretName]: secretValue })
    
    await secretsClient.putSecretValue({
      SecretId: 'MonzoSecrets',
      SecretString: JSON.stringify(newSecrets)
    }).promise();
  } catch (error) {
    throw error;
  }
};