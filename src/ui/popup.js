// Popup interaction and UI logic 

document.addEventListener('DOMContentLoaded', function() {
    const runNowButton = document.getElementById('runNow');
    const botStatusElement = document.getElementById('botStatus');

    runNowButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: 'runBotNow' });
        updateBotStatus('Running');
    });

    function updateBotStatus(status) {
        botStatusElement.textContent = status;
        botStatusElement.style.color = status.toLowerCase() === 'running' ? '#00ff00' : '#00ffff';
    }

    // Check current bot status
    chrome.runtime.sendMessage({ action: 'getBotStatus' }, function(response) {
        updateBotStatus(response.status);
    });
}); 