export const config = {
    TWITTER_ACCOUNTS: [
        'unusual_whales',
        'DeItaone',
        'stocksNYC'
    ],
    TRADING_HOURS: {
        START: '09:30',
        END: '16:00'
    },
    TIME_ZONE: 'America/New_York'
};

export const alpacaConfig = {
    keyId: process.env.ALPACA_API_KEY,
    secretKey: process.env.ALPACA_API_SECRET,
    paper: true // Set to false for live trading
}; 