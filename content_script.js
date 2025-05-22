(() => {
  document.addEventListener('wheel', onWheel, { passive: false });

  function onWheel(event) {
    const isZoomModifierPressed = event.metaKey;
    if (isZoomModifierPressed) {
      event.preventDefault();
      const zoomIn = event.deltaY <= 0;
      chrome.runtime.sendMessage({ zoomIn }).catch((err) => {
        console.warn("Zoom message failed:", err);
      });
    }
  }
})();
