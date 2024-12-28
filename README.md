
# **AI-TradeBOT Chrome Extension**

Welcome to AI-TradeBOT, your handy tool for navigating the unpredictable waters of stock trading. This Chrome extension brings together the power of OpenAI’s GPT, Alpaca trading API, and a bit of Twitter magic to help you make smarter trading decisions. Whether you’re a seasoned trader or just getting started, this bot automates the hard parts so you can focus on... well, anything else.

---

## **Introduction**

Tired of analyzing endless tweets and news updates to figure out the next big stock move? AI-TradeBOT is here to help. It scrapes stock-related tweets, analyzes sentiment using cutting-edge AI, and executes trades automatically using Alpaca. All of this happens seamlessly through your browser, giving you the ultimate tool to stay ahead in the market.

---
![monnnnnn](https://github.com/user-attachments/assets/a63df766-5a9f-447e-bf60-f9d258438a12)

## **How It Works**

Here’s the magic in a nutshell:
- **Twitter Scraping:** AI-TradeBOT gathers tweets from stock news pages to gauge market sentiment.
- **AI Analysis:** Using OpenAI’s GPT, it processes the tweets to figure out which stocks might be worth your attention.
- **Trading Decisions:** If the analysis looks promising, the bot executes trades via Alpaca’s API.

Everything runs on autopilot, but if you like being hands-on, there’s a manual mode too.

---

## **Getting Started**

Setting up AI-TradeBOT is straightforward. Here’s how you do it:

### **Step 1: Clone the Repository**
Start by grabbing the code. Run:
```bash
git clone <repository-url>
```

### **Step 2: Install Dependencies**
Navigate to the project folder and install the required packages:
```bash
npm install
```

### **Step 3: Load the Extension**
1. Open Chrome and go to `chrome://extensions/`.
2. Enable "Developer mode."
3. Click "Load unpacked" and select the `AI-TradeBOT-Chrome-Extension/` directory.

And just like that, the extension is loaded and ready to go!

---

## **Configuration**

To make the bot work, you need to provide some credentials for OpenAI and Alpaca. Here’s what to do:

1. Rename `credentials.env.sample` to `credentials.env`.
2. Add your API keys:
   ```plaintext
   OPENAI_ORGANIZATION_ID=YOUR_OPENAI_ORGANIZATION_ID
   OPENAI_API_KEY=YOUR_OPENAI_API_KEY
   ALPACA_KEY_ID=YOUR_ALPACA_KEY_ID
   ALPACA_SECRET_KEY=YOUR_ALPACA_SECRET_KEY
   ```

---

## **Using AI-TradeBOT**

### **Automatic Mode**
AI-TradeBOT runs every weekday at 10:00 AM Eastern Time. It scrapes tweets, analyzes sentiment, and makes trading decisions automatically. All you need to do is configure it and let it run.

### **Manual Mode**
Want more control? Open the extension popup and click "Run Now" to trigger the bot instantly. It’s great for those “what if” moments.


## **A Quick Heads-Up**

Trading is risky business. While AI-TradeBOT leverages advanced AI and automation, it’s not infallible. The bot relies on social media sentiment, which isn’t always accurate or actionable. Always test thoroughly and use this tool responsibly.

---

## **Contributing**

Got ideas? Found a bug? Feel free to contribute! Fork the repo, create a new branch, and submit a pull request. Or just open an issue—we’d love to hear from you.

---

## **License**

This project is licensed under the MIT License. Check out the [LICENSE.md](LICENSE.md) file for details.
