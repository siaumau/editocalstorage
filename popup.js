document.getElementById('searchBtn').addEventListener('click', () => {
    const key = document.getElementById('searchKey').value;
  
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tabId = tabs[0].id;
  
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        func: (key) => {
          return localStorage.getItem(key);
        },
        args: [key]
      }, (results) => {
        const value = results[0].result;
        document.getElementById('result').textContent = value || '查無資料';
        document.getElementById('editValue').value = value || '';
      });
    });
  });
  