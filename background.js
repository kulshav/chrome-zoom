const zoomLevels = [0.25, 0.33, 0.5, 0.67, 0.75, 0.8, 0.9, 1, 1.1, 1.25, 1.33, 1.4, 1.5, 1.75, 2, 2.5, 3, 4, 5];

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (!sender.tab) return;

  const tabId = sender.tab.id;

  chrome.tabs.getZoom(tabId, (currentZoom) => {
    let currentIndex = zoomLevels.indexOf(currentZoom);
    if (currentIndex === -1) currentIndex = zoomLevels.indexOf(1);
    let newIndex;
    if (request.zoomIn) {
      newIndex = Math.min(currentIndex + 1, zoomLevels.length - 1);
    } else {
      newIndex = Math.max(currentIndex - 1, 0);
    }
    chrome.tabs.setZoom(tabId, zoomLevels[newIndex]);
  });
});
