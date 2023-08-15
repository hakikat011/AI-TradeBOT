const dotenv = require('dotenv');
dotenv.config();

exports.openaiConfig = {
  organization: process.env.OPENAI_ORGANIZATION_ID,
  apiKey: process.env.OPENAI_API_KEY,
};

exports.alpacaConfig = {
  keyId: process.env.ALPACA_KEY_ID,
  secretKey: process.env.ALPACA_SECRET_KEY,
};
