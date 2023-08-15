# AI-TradeBOT
This project integrates Firebase Functions, OpenAI's GPT, Alpaca for stock trading, and Puppeteer for web scraping to create an automatic stock trading bot. The bot scrapes stock-related tweets for context and then uses OpenAI to determine potential stock buying decisions.

# Table of Contents
Installation
Configuration
Usage
Structure
Disclaimer
Contributing
License

#Installation
Clone this repository:

--bash
git clone <repository-url>
Install the required dependencies:
npm install
Set up Firebase and deploy the function (requires Firebase CLI):
--bash
firebase deploy --only functions
Configuration
Rename the .env.sample file to .env.

Fill in your OpenAI and Alpaca API credentials in the .env file:

makefile

OPENAI_ORGANIZATION_ID=YOUR_OPENAI_ORGANIZATION_ID
OPENAI_API_KEY=YOUR_OPENAI_API_KEY
ALPACA_KEY_ID=YOUR_ALPACA_KEY_ID
ALPACA_SECRET_KEY=YOUR_ALPACA_SECRET_KEY

#Usage
The bot will automatically run on weekdays (Monday to Friday) at 10:00 AM Eastern Time, scrape tweets from a stock news page on Twitter, make an informed decision using OpenAI, and then potentially place an order using the Alpaca API.

You can test the system by triggering the helloWorld function on Firebase.

Structure

config.js - Manages the environment configuration.
api.js - Initializes the OpenAI and Alpaca APIs.
scrape.js - Contains the logic to scrape tweets from Twitter.
functions.js - Contains the main Firebase functions.

#Disclaimer
This bot uses tweets to make stock-buying decisions. This approach is experimental and comes with a high risk. Always test thoroughly and use at your own discretion. Do not invest money you cannot afford to lose.

#Contributing
Feel free to submit pull requests or raise issues. We appreciate all contributions.

License
This project is licensed under the MIT License - see the LICENSE.md file for details.

