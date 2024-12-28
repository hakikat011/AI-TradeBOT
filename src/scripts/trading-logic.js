import { alpacaConfig } from '../config/config.js';
import Alpaca from '@alpacahq/alpaca-trade-api';

const alpaca = new Alpaca(alpacaConfig);

// Risk management constants
const MAX_POSITION_SIZE = 0.1; // 10% of portfolio
const STOP_LOSS_PERCENTAGE = 0.02; // 2% stop loss
const TAKE_PROFIT_PERCENTAGE = 0.05; // 5% take profit

export async function executeTrade(sentiment) {
    try {
        console.log('Analyzing trade opportunity:', sentiment);
        
        // Get account information
        const account = await alpaca.getAccount();
        const buyingPower = parseFloat(account.buying_power);
        
        // Calculate position size based on confidence
        const positionSize = calculatePositionSize(buyingPower, sentiment.confidence);
        
        if (positionSize < 100) { // Minimum trade size
            console.log('Position size too small, skipping trade');
            return false;
        }

        // Close existing positions if sentiment changed
        await manageExistingPositions(sentiment.recommendedStock);

        // Execute new trade if sentiment is strong enough
        if (sentiment.confidence >= 0.7) {
            const order = await placeTrade(sentiment, positionSize);
            
            if (order) {
                // Place protective stops
                await setStopOrders(order, sentiment.recommendedStock);
                return true;
            }
        }

        return false;
    } catch (error) {
        console.error('Trading error:', error);
        return false;
    }
}

async function manageExistingPositions(symbol) {
    try {
        const positions = await alpaca.getPositions();
        const existingPosition = positions.find(p => p.symbol === symbol);
        
        if (existingPosition) {
            await alpaca.closePosition(symbol);
            console.log(`Closed existing position in ${symbol}`);
        }
    } catch (error) {
        console.error('Error managing positions:', error);
    }
}

async function placeTrade(sentiment, positionSize) {
    const side = sentiment.sentiment === 'positive' ? 'buy' : 'sell';
    
    try {
        const order = await alpaca.createOrder({
            symbol: sentiment.recommendedStock,
            qty: Math.floor(positionSize),
            side: side,
            type: 'market',
            time_in_force: 'day',
        });

        console.log(`${side.toUpperCase()} order placed for ${sentiment.recommendedStock}`);
        return order;
    } catch (error) {
        console.error('Order placement error:', error);
        return null;
    }
}

async function setStopOrders(primaryOrder, symbol) {
    try {
        const price = parseFloat(primaryOrder.filled_avg_price);
        
        // Set stop loss
        await alpaca.createOrder({
            symbol: symbol,
            qty: primaryOrder.qty,
            side: primaryOrder.side === 'buy' ? 'sell' : 'buy',
            type: 'stop',
            time_in_force: 'gtc',
            stop_price: calculateStopPrice(price, primaryOrder.side),
        });

        // Set take profit
        await alpaca.createOrder({
            symbol: symbol,
            qty: primaryOrder.qty,
            side: primaryOrder.side === 'buy' ? 'sell' : 'buy',
            type: 'limit',
            time_in_force: 'gtc',
            limit_price: calculateTakeProfit(price, primaryOrder.side),
        });

        console.log('Protective orders placed successfully');
    } catch (error) {
        console.error('Error setting protective orders:', error);
    }
}

function calculatePositionSize(buyingPower, confidence) {
    // Scale position size with confidence and max position size
    return buyingPower * MAX_POSITION_SIZE * confidence;
}

function calculateStopPrice(entryPrice, side) {
    return side === 'buy' 
        ? entryPrice * (1 - STOP_LOSS_PERCENTAGE)
        : entryPrice * (1 + STOP_LOSS_PERCENTAGE);
}

function calculateTakeProfit(entryPrice, side) {
    return side === 'buy'
        ? entryPrice * (1 + TAKE_PROFIT_PERCENTAGE)
        : entryPrice * (1 - TAKE_PROFIT_PERCENTAGE);
} 