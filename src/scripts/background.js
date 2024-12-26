import { fetchSentiment } from '../utils/sentiment-analysis.js';
import { executeTrade } from './trading-logic.js';
import { scrapeTwitter } from './twitter-scraper.js';

// Set up daily alarm
chrome.alarms.create('tradingCheck', {
    periodInMinutes: 1440, // Daily
    when: getNextTradingTime()
});

// Listen for alarm
chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'tradingCheck') {
        await runTradingBot();
    }
});

// Listen for manual triggers from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'runBotNow') {
        runTradingBot();
        sendResponse({status: 'started'});
    }
});

function getNextTradingTime() {
    const now = new Date();
    const tradingTime = new Date(now);
    tradingTime.setHours(9, 30, 0, 0); // 9:30 AM

    if (now > tradingTime) {
        tradingTime.setDate(tradingTime.getDate() + 1);
    }

    return tradingTime.getTime();
}

async function runTradingBot() {
    try {
        const tweets = await scrapeTwitter();
        const sentiment = await fetchSentiment(tweets);
        if (sentiment) {
            await executeTrade(sentiment);
        }
    } catch (error) {
        console.error('Trading bot error:', error);
    }
} 