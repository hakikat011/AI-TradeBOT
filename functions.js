const functions = require('firebase-functions');
const { openai, alpaca } = require('./api.js');
const { scrapeTwitter } = require('./scrape.js');

exports.helloWorld = functions.https.onRequest(async (request, response) => {
  // test logic here
  response.send('test');
});

exports.hereComesTheMoney = functions
  .runWith({ memory: '4GB' })
  .pubsub.schedule('0 10 * * 1-5')
  .timeZone('America/New_York')
  .onRun(async (ctx) => {
    console.log('This will run M-F at 10:00 AM Eastern!');

    const tweets = await scrapeTwitter();

    const gptCompletion = await openai.createCompletion('text-davinci-001', {
      prompt: `${tweets} stock news and update page recommends: `,
      temperature: 0.7, 
      max_tokens: 32,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const stocksToBuy = gptCompletion.data.choices[0].text.match(/\b[A-Z]+\b/g);
    console.log(`Thanks for the tips Elon ${stocksToBuy}`);

    if (!stocksToBuy) {
      console.log('sitting this one out');
      return null;
    }

    //// ALPACA Make Trades ////

    // close all positions
    const cancel = await alpaca.cancelAllOrders();
    const liquidate = await alpaca.closeAllPositions();

    // get account
    const account = await alpaca.getAccount();
    console.log(`dry powder: ${account.buying_power}`);

    // place order
    const order = await alpaca.createOrder({
      symbol: stocksToBuy[0],
      notional: account.buying_power * 0.9,
      side: 'buy',
      type: 'market',
      time_in_force: 'day',
    });

    console.log(`STONKS THAT WERE NOW BOUGHT : ${order.id}`);

    return null;
  });
