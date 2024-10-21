let activeTabs = new Set();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "registerTab" && sender.tab) {
        activeTabs.add(sender.tab.id);
        chrome.storage.local.set({ activeTabs: Array.from(activeTabs) });
    }
});

chrome.tabs.onActivated.addListener(function(activeInfo) {
    chrome.tabs.get(activeInfo.tabId, function(tab) {
        if (tab.url && tab.url.startsWith('http')) {
            chrome.scripting.executeScript({
                target: { tabId: activeInfo.tabId },
                files: ['content.js']
            });
        }
    });
});

