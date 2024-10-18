document.addEventListener('DOMContentLoaded', function() {
	const colorItems = document.querySelectorAll('.koshochka-widget-colors-list .item');
	chrome.storage.local.get(['selectedColor'], function(result) {
	    if (result.selectedColor) {
	    	const selectedElement = document.querySelector(`[data-entity="${result.selectedColor}"]`);
	    	if (selectedElement) {
	        	setActiveColor(selectedElement);
	    	}
	    }
	});

	colorItems.forEach(item => {
	    item.addEventListener('click', function() {
		    setActiveColor(this);
		    const selectedColor = this.getAttribute('data-entity');
		    chrome.storage.local.set({ selectedColor: selectedColor });
		    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	            chrome.tabs.sendMessage(tabs[0].id, { action: "changeKoshochkaColor", color: selectedColor });
	        });
	    });
	});

	function setActiveColor(selectedElement) {
	    colorItems.forEach(item => item.classList.remove('active'));
	    selectedElement.classList.add('active');
	}

	let releaseTheKraken = document.getElementById("koshochkaTourist");

	releaseTheKraken.addEventListener('click', function() {
	     chrome.storage.local.get(['selectedColor'], function(result) {
	         const defaultColor = 'color-0-0'; 
	         const colorToUse = result.selectedColor || defaultColor;

	         chrome.storage.local.set({ showKoshochka: true, koshochkaColor: colorToUse });

	         chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
	             chrome.tabs.sendMessage(tabs[0].id, { action: "releaseKoshochka", color: colorToUse });
	         });
	     });
	});

	function removeObjectFromAllTabs() {
	    chrome.storage.local.get(['activeTabs'], function(result) {
	        if (result.activeTabs) {
	            result.activeTabs.forEach(tabId => {
	                chrome.tabs.sendMessage(tabId, { action: "removeKoshochka" }, function(response) {
	                    if (chrome.runtime.lastError) {
	                        console.warn(`Could not send message to tab ${tabId}: ${chrome.runtime.lastError.message}`);
	                        chrome.storage.local.get(['activeTabs'], function(res) {
	                            const updatedTabs = res.activeTabs.filter(id => id !== tabId);
	                            chrome.storage.local.set({ activeTabs: updatedTabs });
	                        });
	                    } else if (response && response.status === "success") {
	                        console.log(`Message successfully sent to tab ${tabId}`);
	                    }
	                });
	            });
	        }
	    });
	}

	let hideTheKraken = document.getElementById("hideTheKoshochka");

	hideTheKraken.addEventListener('click', function() {
		chrome.storage.local.set({ showKoshochka: false });
		removeObjectFromAllTabs();
	});

});


