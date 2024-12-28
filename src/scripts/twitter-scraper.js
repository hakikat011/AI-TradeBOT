import { config } from '../config/config.js';

/**
 * Scrapes tweets from configured Twitter accounts using Chrome extension APIs
 */
export async function scrapeTwitter() {
    try {
        const tweets = [];
        
        for (const account of config.TWITTER_ACCOUNTS) {
            // Use Chrome's tabs API to scrape tweets
            const tabs = await chrome.tabs.create({
                url: `https://twitter.com/${account}`,
                active: false // Open in background
            });

            // Wait for page load and execute content script
            await new Promise(resolve => setTimeout(resolve, 3000));

            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
            
            const result = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: scrapeTweetsFromPage,
            });

            // Extract tweets from the page
            if (result && result[0]?.result) {
                tweets.push(...result[0].result);
            }

            // Cleanup: close the tab
            await chrome.tabs.remove(tab.id);
        }

        return tweets;
    } catch (error) {
        console.error('Twitter scraping error:', error);
        return [];
    }
}

/**
 * Content script function that runs in the context of Twitter's page
 * Returns an array of relevant tweets
 */
function scrapeTweetsFromPage() {
    const tweets = [];
    
    // Select all tweet articles
    const tweetElements = document.querySelectorAll('article[data-testid="tweet"]');
    
    tweetElements.forEach(tweet => {
        // Get tweet text content
        const tweetText = tweet.querySelector('[data-testid="tweetText"]')?.innerText;
        
        // Get timestamp
        const timestamp = tweet.querySelector('time')?.getAttribute('datetime');
        
        // Only include tweets from the last 24 hours that mention stocks
        if (tweetText && timestamp) {
            const tweetDate = new Date(timestamp);
            const isRecent = (Date.now() - tweetDate.getTime()) < 24 * 60 * 60 * 1000;
            
            // Basic filter for stock-related content
            const hasStockMention = /\$[A-Z]{1,5}|stock|market|trade/i.test(tweetText);
            
            if (isRecent && hasStockMention) {
                tweets.push({
                    text: tweetText,
                    timestamp: timestamp,
                    url: tweet.querySelector('a[href*="/status/"]')?.href || ''
                });
            }
        }
    });

    return tweets;
} 