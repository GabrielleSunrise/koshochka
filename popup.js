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

	let hideTheKraken = document.getElementById("hideTheKoshochka");

	hideTheKraken.addEventListener('click', function() {
		chrome.storage.local.set({ showKoshochka: false });

		chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { action: "hideKoshochka" });
		});
	});

});


