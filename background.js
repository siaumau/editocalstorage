// background.js - 背景腳本
let sidebarActiveTabIds = new Set(); // 追蹤哪些分頁有側邊欄

// 在擴充功能圖標被點擊時執行
chrome.action.onClicked.addListener(async (tab) => {
  try {
    // 檢查當前分頁是否有側邊欄
    const [result] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        return document.getElementById('localStorage-manager-sidebar') !== null;
      }
    });
    
    const sidebarExists = result.result;
    
    if (sidebarExists) {
      // 如果側邊欄存在，則移除它
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
          const sidebar = document.getElementById('localStorage-manager-sidebar');
          if (sidebar) sidebar.remove();
          return false;
        }
      });
      sidebarActiveTabIds.delete(tab.id);
    } else {
      // 如果側邊欄不存在，則注入它
      await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["inject.js"]
      });
      sidebarActiveTabIds.add(tab.id);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// 監聽分頁更新事件
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // 只在頁面完全加載後且該分頁在活動列表中才重新注入側邊欄
  if (changeInfo.status === 'complete' && sidebarActiveTabIds.has(tabId)) {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ["inject.js"]
    }).catch(err => console.error("Injection error:", err));
  }
});

// 監聽分頁關閉事件
chrome.tabs.onRemoved.addListener((tabId) => {
  // 從活動列表中移除關閉的分頁
  sidebarActiveTabIds.delete(tabId);
});