chrome.runtime.onInstalled.addListener(() => {
    console.log('LockGen installed successfully.');
    // Perform any setup tasks here
});

// Listen for messages from the content scripts or popup to perform actions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "checkMembership") {
        const status = localStorage.getItem('membershipStatus') || 'Bronze';
        sendResponse({ status: status });
    }
});
