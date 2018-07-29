const AWS = require('aws-sdk');
const config = require('config');
const retrieveRefreshToken = require('./src/apiAccess/retrieveRefreshToken');

const endpoint = 'https://secretsmanager.eu-west-2.amazonaws.com';
const region = 'eu-west-2';

const client = new AWS.SecretsManager({ region, endpoint });
const refreshTokenName = config.get('refreshTokenName');

retrieveRefreshToken(client, refreshTokenName);