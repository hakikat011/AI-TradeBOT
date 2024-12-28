export class TradingError extends Error {
    constructor(message, type = 'TRADING_ERROR') {
        super(message);
        this.type = type;
    }
}

export function handleError(error, context = '') {
    console.error(`${context} Error:`, error);
    // Could add error reporting service here
    return null;
} 