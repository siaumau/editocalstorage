// content.js - 簡單的內容腳本
// 這個文件只是作為與背景腳本通信的橋樑
// 實際的側邊欄功能由 inject.js 實現

// 監聽來自背景腳本的消息
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  if (message.action === "checkSidebarStatus") {
    // 檢查側邊欄是否存在
    const exists = document.getElementById('localStorage-manager-sidebar') !== null;
    sendResponse({exists: exists});
  }
});

// 通知背景腳本內容腳本已載入
chrome.runtime.sendMessage({action: "contentScriptLoaded"});