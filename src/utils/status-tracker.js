export class BotStatus {
    static IDLE = 'idle';
    static RUNNING = 'running';
    static ERROR = 'error';
    
    static async updateStatus(status, details = '') {
        await chrome.storage.local.set({
            botStatus: {
                status,
                details,
                timestamp: new Date().toISOString()
            }
        });
    }
} 