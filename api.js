const { Configuration, OpenAIApi } = require('openai');
const { openaiConfig } = require('./config.js');

const openaiConfiguration = new Configuration(openaiConfig);
exports.openai = new OpenAIApi(openaiConfiguration);

const Alpaca = require('@alpacahq/alpaca-trade-api');
const { alpacaConfig } = require('./config.js');

exports.alpaca = new Alpaca(alpacaConfig);
