const AWS = require('aws-sdk');
const config = require('config');
const getRefreshToken = require('./src/apiAccess/getRefreshToken');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const client = new AWS.SecretsManager({ region, endpoint });
const refreshTokenName = config.get('refreshTokenName');

getRefreshToken(client, refreshTokenName);