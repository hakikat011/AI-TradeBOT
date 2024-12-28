import Alpaca from '@alpacahq/alpaca-trade-api';
import { alpacaConfig } from '../config/config.js';

const alpaca = new Alpaca(alpacaConfig);

export async function getAccount() {
    return await alpaca.getAccount();
}

export async function getPosition(symbol) {
    try {
        return await alpaca.getPosition(symbol);
    } catch (error) {
        return null;
    }
}

export async function submitOrder(orderParams) {
    return await alpaca.createOrder(orderParams);
}

export async function closePosition(symbol) {
    return await alpaca.closePosition(symbol);
}

export async function cancelAllOrders() {
    return await alpaca.cancelAllOrders();
} 