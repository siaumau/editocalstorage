# LocalStorage Manager Pro

一個功能強大的 Chrome 擴充功能，用於實時監控、管理和編輯網站的 localStorage 數據。

![LocalStorage Manager Pro 截圖](screenshot.png)

## 功能特色

- **實時監控**: 自動偵測並顯示 localStorage 的實時變化
- **側邊欄界面**: 在頁面右側顯示美觀的側邊欄界面，不影響頁面內容
- **跨頁面持久化**: 頁面重新整理或導航到新頁面時保持側邊欄顯示
- **搜尋過濾**: 快速搜尋特定的 localStorage 鍵值
- **編輯功能**: 輕鬆新增、修改、刪除 localStorage 項目
- **JSON 支援**: 自動識別 JSON 數據並提供格式化功能
- **詳細元數據**: 顯示項目大小和數據類型等有用信息
- **友好的通知**: 操作成功或失敗時顯示美觀的通知提示

## 安裝方法

### 開發模式安裝

1. 下載或克隆此存儲庫到本地
2. 開啟 Chrome 瀏覽器，進入擴充功能管理頁面 (`chrome://extensions/`)
3. 開啟右上角的「開發人員模式」
4. 點擊「載入未封裝項目」
5. 選擇含有此擴充功能文件的資料夾

### 文件結構

```
localStorage-manager-pro/
├── manifest.json        // 擴充功能配置
├── background.js        // 背景腳本
├── content.js           // 內容腳本
├── inject.js            // 側邊欄實現代碼
└── icon16.png           // 圖標文件
```

## 使用方法

1. 安裝擴充功能後，在任意網頁上點擊工具欄中的「LocalStorage Manager Pro」圖標
2. 右側將顯示側邊欄，列出當前網站的所有 localStorage 項目
3. 使用側邊欄上方的搜尋框快速過濾項目
4. 點擊「新增項目」按鈕添加新的 localStorage 條目
5. 點擊每個項目的「更新」按鈕保存修改，或「刪除」按鈕移除項目
6. 對於 JSON 數據，點擊「格式化」選項可以美化顯示
7. 側邊欄會持續顯示，即使在頁面重新整理後，直到您點擊關閉按鈕或再次點擊擴充功能圖標

## 進階功能

### 實時監控

擴充功能使用多種機制來偵測 localStorage 的變化：

- 重寫原生 localStorage 方法
- 定時檢查變化
- 監聽 storage 事件

當 localStorage 數據發生變化時，側邊欄會立即更新，並用閃爍效果標記變化的項目。

### JSON 處理

對於 JSON 格式的數據，擴充功能提供了特殊處理：

- 自動識別 JSON 格式
- 提供格式化選項，使 JSON 數據更易讀
- 顯示特殊標記，表明這是 JSON 數據

## 常見問題

**Q: 側邊欄會影響頁面的正常顯示嗎？**  
A: 不會，側邊欄使用絕對定位，不會影響頁面內容的布局。

**Q: 如何在不同標籤頁間保持側邊欄？**  
A: 擴充功能記住了側邊欄的狀態，當您導航到新頁面或重新整理頁面時，會自動重新顯示側邊欄。

**Q: 如何完全關閉側邊欄？**  
A: 點擊側邊欄右上角的 X 按鈕，或再次點擊工具欄上的擴充功能圖標。

**Q: 是否支持大型 localStorage 數據？**  
A: 是的，擴充功能對大型數據做了優化處理，包括分段加載和性能優化。

## 隱私說明

此擴充功能僅在用戶的瀏覽器中運行，不會將任何數據發送到外部伺服器。它只讀取和修改用戶當前訪問網站的 localStorage 數據。

## 授權協議

此專案採用 [MIT 授權協議](LICENSE)。

## 更新日誌

### 版本 1.0.0
- 初始版本發布
- 實現基本的 localStorage 管理功能
- 添加實時監控和頁面間持久化功能

---

如有任何問題或建議，請提交 Issue 或聯繫作者。