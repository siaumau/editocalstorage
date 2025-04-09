// inject.js - 專業美化版 localStorage 管理器
(function() {
    // 如果已經存在側邊欄，則不重複添加
    if (document.getElementById('localStorage-manager-sidebar')) {
      return;
    }
  
    // 添加樣式
    const style = document.createElement('style');
    style.textContent = `
      #localStorage-manager-sidebar {
        position: fixed;
        top: 0;
        right: 0;
        width: 340px;
        height: 100vh;
        background-color: #2c3e50;
        color: #ecf0f1;
        z-index: 9999999;
        font-family: 'Segoe UI', 'Roboto', sans-serif;
        box-shadow: -3px 0 15px rgba(0,0,0,0.5);
        transition: transform 0.3s ease;
        display: flex;
        flex-direction: column;
      }
      
      #lsm-header {
        padding: 16px;
        background-color: #34495e;
        border-bottom: 1px solid #3d566e;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      
      #lsm-title {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #ecf0f1;
        display: flex;
        align-items: center;
        gap: 8px;
      }
      
      #lsm-logo {
        width: 20px;
        height: 20px;
        background-color: #3498db;
        border-radius: 4px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      #lsm-logo:before {
        content: 'LS';
        font-size: 10px;
        font-weight: bold;
        color: white;
      }
      
      #lsm-close-btn {
        background: none;
        border: none;
        color: #bdc3c7;
        font-size: 18px;
        cursor: pointer;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
      }
      
      #lsm-close-btn:hover {
        background-color: rgba(255,255,255,0.1);
        color: white;
      }
      
      #lsm-controls {
        padding: 16px;
        border-bottom: 1px solid #3d566e;
      }
      
      #lsm-search {
        width: 100%;
        padding: 10px 12px;
        background-color: #34495e;
        border: 1px solid #3d566e;
        border-radius: 6px;
        color: #ecf0f1;
        font-size: 14px;
        margin-bottom: 12px;
        box-sizing: border-box;
      }
      
      #lsm-search:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
      }
      
      #lsm-search::placeholder {
        color: #95a5a6;
      }
      
      #lsm-button-bar {
        display: flex;
        gap: 8px;
      }
      
      .lsm-button {
        flex: 1;
        padding: 8px 0;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        border: none;
        text-align: center;
        transition: background-color 0.2s;
      }
      
      .lsm-button-primary {
        background-color: #3498db;
        color: white;
      }
      
      .lsm-button-primary:hover {
        background-color: #2980b9;
      }
      
      .lsm-button-secondary {
        background-color: #34495e;
        color: #ecf0f1;
        border: 1px solid #3d566e;
      }
      
      .lsm-button-secondary:hover {
        background-color: #3d566e;
      }
      
      #lsm-items-container {
        flex: 1;
        overflow-y: auto;
        padding: 12px;
      }
      
      #lsm-items-container::-webkit-scrollbar {
        width: 6px;
      }
      
      #lsm-items-container::-webkit-scrollbar-track {
        background: #34495e;
      }
      
      #lsm-items-container::-webkit-scrollbar-thumb {
        background-color: #3d566e;
        border-radius: 3px;
      }
      
      .lsm-empty {
        text-align: center;
        padding: 32px 0;
        color: #95a5a6;
        font-size: 14px;
      }
      
      .lsm-item {
        margin-bottom: 12px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #34495e;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }
      
      .lsm-item-header {
        padding: 10px 12px;
        background-color: #3d566e;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: 500;
        font-size: 13px;
        border-bottom: 1px solid #486582;
      }
      
      .lsm-item-key {
        word-break: break-all;
        max-width: 225px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      
      .lsm-item-expand {
        cursor: pointer;
        width: 24px;
        height: 24px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
        color: #bdc3c7;
      }
      
      .lsm-item-expand:hover {
        background-color: rgba(255,255,255,0.1);
        color: white;
      }
      
      .lsm-item-content {
        padding: 12px;
      }
      
      .lsm-textarea {
        width: 100%;
        min-height: 80px;
        padding: 10px;
        background-color: #2c3e50;
        border: 1px solid #3d566e;
        border-radius: 4px;
        color: #ecf0f1;
        font-family: 'Consolas', 'Monaco', monospace;
        font-size: 13px;
        resize: vertical;
        margin-bottom: 12px;
        box-sizing: border-box;
      }
      
      .lsm-textarea:focus {
        outline: none;
        border-color: #3498db;
        box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
      }
      
      .lsm-action-buttons {
        display: flex;
        justify-content: space-between;
        gap: 8px;
      }
      
      .lsm-button-update {
        background-color: #2ecc71;
      }
      
      .lsm-button-update:hover {
        background-color: #27ae60;
      }
      
      .lsm-button-delete {
        background-color: #e74c3c;
      }
      
      .lsm-button-delete:hover {
        background-color: #c0392b;
      }
      
      .lsm-metadata {
        display: flex;
        gap: 8px;
        font-size: 11px;
        color: #95a5a6;
        margin-top: 10px;
        padding-top: 10px;
        border-top: 1px solid #3d566e;
      }
      
      .lsm-metadata-item {
        background-color: #2c3e50;
        padding: 4px 8px;
        border-radius: 4px;
      }
      
      .lsm-footer {
        padding: 12px;
        border-top: 1px solid #3d566e;
        text-align: center;
        font-size: 12px;
        color: #7f8c8d;
      }
      
      .lsm-notification {
        position: fixed;
        bottom: 20px;
        right: 360px;
        padding: 10px 16px;
        border-radius: 6px;
        color: white;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 3px 10px rgba(0,0,0,0.2);
        transform: translateY(20px);
        opacity: 0;
        transition: transform 0.3s, opacity 0.3s;
      }
      
      .lsm-notification.show {
        transform: translateY(0);
        opacity: 1;
      }
      
      .lsm-notification-success {
        background-color: #2ecc71;
      }
      
      .lsm-notification-error {
        background-color: #e74c3c;
      }
      
      .lsm-notification-info {
        background-color: #3498db;
      }
      
      .lsm-badge {
        background-color: #3498db;
        color: white;
        font-size: 11px;
        padding: 2px 6px;
        border-radius: 10px;
        margin-left: 6px;
      }
    `;
    document.head.appendChild(style);
  
    // 創建側邊欄容器
    const sidebar = document.createElement('div');
    sidebar.id = 'localStorage-manager-sidebar';
    
    // 創建標題欄
    const header = document.createElement('div');
    header.id = 'lsm-header';
    
    const title = document.createElement('h1');
    title.id = 'lsm-title';
    
    const logo = document.createElement('div');
    logo.id = 'lsm-logo';
    
    title.appendChild(logo);
    title.appendChild(document.createTextNode('localStorage 管理器'));
    
    const closeBtn = document.createElement('button');
    closeBtn.id = 'lsm-close-btn';
    closeBtn.innerHTML = '&times;';
    closeBtn.title = '關閉側邊欄';
    closeBtn.onclick = function() {
      sidebar.remove();
    };
    
    header.appendChild(title);
    header.appendChild(closeBtn);
    sidebar.appendChild(header);
    
    // 控制欄
    const controls = document.createElement('div');
    controls.id = 'lsm-controls';
    
    const search = document.createElement('input');
    search.id = 'lsm-search';
    search.type = 'text';
    search.placeholder = '搜尋 key...';
    search.oninput = function() {
      filterItems(this.value);
    };
    
    const buttonBar = document.createElement('div');
    buttonBar.id = 'lsm-button-bar';
    
    const addBtn = document.createElement('button');
    addBtn.className = 'lsm-button lsm-button-primary';
    addBtn.textContent = '新增項目';
    addBtn.onclick = addNewItem;
    
    const clearBtn = document.createElement('button');
    clearBtn.className = 'lsm-button lsm-button-secondary';
    clearBtn.textContent = '清空所有';
    clearBtn.onclick = function() {
      if (confirm('確定要清空所有 localStorage 項目嗎？此操作無法撤銷。')) {
        localStorage.clear();
        loadLocalStorageItems();
        showNotification('所有項目已清空', 'success');
      }
    };
    
    buttonBar.appendChild(addBtn);
    buttonBar.appendChild(clearBtn);
    
    controls.appendChild(search);
    controls.appendChild(buttonBar);
    sidebar.appendChild(controls);
    
    // 項目容器
    const itemsContainer = document.createElement('div');
    itemsContainer.id = 'lsm-items-container';
    sidebar.appendChild(itemsContainer);
    
    // 頁腳
    const footer = document.createElement('div');
    footer.className = 'lsm-footer';
    footer.textContent = 'localStorage 管理器 | ' + new Date().getFullYear();
    sidebar.appendChild(footer);
    
    // 添加側邊欄到頁面
    document.body.appendChild(sidebar);
    
    // 加載所有 localStorage 項目
    loadLocalStorageItems();
    
    // 函數: 加載所有 localStorage 項目
    function loadLocalStorageItems() {
      const container = document.getElementById('lsm-items-container');
      container.innerHTML = '';
      
      if (localStorage.length === 0) {
        const emptyMsg = document.createElement('div');
        emptyMsg.className = 'lsm-empty';
        emptyMsg.innerHTML = '<div>沒有 localStorage 項目</div>';
        container.appendChild(emptyMsg);
        return;
      }
      
      // 顯示項目總數
      const itemCount = document.createElement('div');
      itemCount.style.padding = '0 0 12px 4px';
      itemCount.style.fontSize = '13px';
      itemCount.style.color = '#7f8c8d';
      itemCount.textContent = `共 ${localStorage.length} 個項目`;
      container.appendChild(itemCount);
      
      // 遍歷所有項目
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        try {
          const value = localStorage.getItem(key);
          createItemElement(key, value, container);
        } catch (error) {
          console.error(`無法讀取 localStorage 項目 ${key}:`, error);
        }
      }
    }
    
    // 函數: 創建每個 localStorage 項目元素
    function createItemElement(key, value, container) {
      const itemEl = document.createElement('div');
      itemEl.className = 'lsm-item';
      itemEl.setAttribute('data-key', key);
      
      // 項目標題
      const itemHeader = document.createElement('div');
      itemHeader.className = 'lsm-item-header';
      
      const keyEl = document.createElement('div');
      keyEl.className = 'lsm-item-key';
      keyEl.title = key;
      keyEl.textContent = key;
      
      const expandBtn = document.createElement('div');
      expandBtn.className = 'lsm-item-expand';
      expandBtn.innerHTML = '▼';
      expandBtn.onclick = function() {
        const content = this.parentNode.nextElementSibling;
        if (content.style.display === 'none') {
          content.style.display = 'block';
          this.innerHTML = '▼';
        } else {
          content.style.display = 'none';
          this.innerHTML = '▶';
        }
      };
      
      itemHeader.appendChild(keyEl);
      itemHeader.appendChild(expandBtn);
      itemEl.appendChild(itemHeader);
      
      // 項目內容
      const itemContent = document.createElement('div');
      itemContent.className = 'lsm-item-content';
      
      const textarea = document.createElement('textarea');
      textarea.className = 'lsm-textarea';
      textarea.value = value;
      
      const actionButtons = document.createElement('div');
      actionButtons.className = 'lsm-action-buttons';
      
      const updateBtn = document.createElement('button');
      updateBtn.className = 'lsm-button lsm-button-update';
      updateBtn.textContent = '更新';
      updateBtn.onclick = function() {
        try {
          localStorage.setItem(key, textarea.value);
          showNotification(`項目 "${key}" 已更新`, 'success');
        } catch (error) {
          showNotification(`更新失敗: ${error.message}`, 'error');
        }
      };
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'lsm-button lsm-button-delete';
      deleteBtn.textContent = '刪除';
      deleteBtn.onclick = function() {
        if (confirm(`確定要刪除 "${key}" 嗎？`)) {
          try {
            localStorage.removeItem(key);
            itemEl.remove();
            
            // 如果刪除後沒有項目，重新加載視圖
            if (localStorage.length === 0) {
              loadLocalStorageItems();
            }
            
            showNotification(`項目 "${key}" 已刪除`, 'success');
          } catch (error) {
            showNotification(`刪除失敗: ${error.message}`, 'error');
          }
        }
      };
      
      actionButtons.appendChild(updateBtn);
      actionButtons.appendChild(deleteBtn);
      
      // 嘗試解析 JSON 值並顯示內容大小
      const metadata = document.createElement('div');
      metadata.className = 'lsm-metadata';
      
      const sizeInfo = document.createElement('div');
      sizeInfo.className = 'lsm-metadata-item';
      sizeInfo.textContent = `大小: ${calculateSize(value)}`;
      metadata.appendChild(sizeInfo);
      
      try {
        // 嘗試解析 JSON
        JSON.parse(value);
        const jsonInfo = document.createElement('div');
        jsonInfo.className = 'lsm-metadata-item';
        jsonInfo.textContent = 'JSON 數據';
        metadata.appendChild(jsonInfo);
        
        // 添加格式化按鈕
        const formatBtn = document.createElement('div');
        formatBtn.className = 'lsm-metadata-item';
        formatBtn.textContent = '格式化';
        formatBtn.style.cursor = 'pointer';
        formatBtn.onclick = function() {
          try {
            const obj = JSON.parse(textarea.value);
            textarea.value = JSON.stringify(obj, null, 2);
          } catch (e) {
            showNotification('無法格式化：不是有效的 JSON', 'error');
          }
        };
        metadata.appendChild(formatBtn);
      } catch (e) {
        // 不是 JSON，顯示類型
        const typeInfo = document.createElement('div');
        typeInfo.className = 'lsm-metadata-item';
        typeInfo.textContent = `類型: ${getValueType(value)}`;
        metadata.appendChild(typeInfo);
      }
      
      itemContent.appendChild(textarea);
      itemContent.appendChild(actionButtons);
      itemContent.appendChild(metadata);
      itemEl.appendChild(itemContent);
      
      container.appendChild(itemEl);
    }
    
    // 函數: 過濾項目
    function filterItems(searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      const items = document.querySelectorAll('.lsm-item');
      let visibleCount = 0;
      
      items.forEach(item => {
        const key = item.getAttribute('data-key').toLowerCase();
        if (key.includes(searchTerm)) {
          item.style.display = 'block';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });
      
      // 更新搜尋結果計數
      const itemCount = document.querySelector('#lsm-items-container > div:first-child');
      if (itemCount) {
        if (searchTerm) {
          itemCount.textContent = `找到 ${visibleCount} / ${localStorage.length} 個項目`;
        } else {
          itemCount.textContent = `共 ${localStorage.length} 個項目`;
        }
      }
    }
    
    // 函數: 添加新項目
    function addNewItem() {
      // 創建對話框
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = '0';
      overlay.style.left = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
      overlay.style.zIndex = '10000';
      overlay.style.display = 'flex';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems = 'center';
      
      const dialog = document.createElement('div');
      dialog.style.backgroundColor = '#34495e';
      dialog.style.color = '#ecf0f1';
      dialog.style.borderRadius = '8px';
      dialog.style.width = '400px';
      dialog.style.maxWidth = '90%';
      dialog.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
      dialog.style.overflow = 'hidden';
      
      const dialogHeader = document.createElement('div');
      dialogHeader.style.backgroundColor = '#2c3e50';
      dialogHeader.style.padding = '16px';
      dialogHeader.style.borderBottom = '1px solid #3d566e';
      dialogHeader.style.fontSize = '18px';
      dialogHeader.style.fontWeight = '600';
      dialogHeader.textContent = '新增 localStorage 項目';
      
      const dialogContent = document.createElement('div');
      dialogContent.style.padding = '16px';
      
      const keyInput = document.createElement('input');
      keyInput.type = 'text';
      keyInput.placeholder = '輸入 key 名稱';
      keyInput.style.width = '100%';
      keyInput.style.padding = '10px 12px';
      keyInput.style.marginBottom = '16px';
      keyInput.style.boxSizing = 'border-box';
      keyInput.style.borderRadius = '6px';
      keyInput.style.border = '1px solid #3d566e';
      keyInput.style.backgroundColor = '#2c3e50';
      keyInput.style.color = '#ecf0f1';
      keyInput.style.fontSize = '14px';
      
      const valueTextarea = document.createElement('textarea');
      valueTextarea.placeholder = '輸入值';
      valueTextarea.style.width = '100%';
      valueTextarea.style.height = '150px';
      valueTextarea.style.padding = '10px 12px';
      valueTextarea.style.boxSizing = 'border-box';
      valueTextarea.style.borderRadius = '6px';
      valueTextarea.style.border = '1px solid #3d566e';
      valueTextarea.style.backgroundColor = '#2c3e50';
      valueTextarea.style.color = '#ecf0f1';
      valueTextarea.style.fontSize = '14px';
      valueTextarea.style.fontFamily = 'monospace';
      valueTextarea.style.resize = 'vertical';
      valueTextarea.style.marginBottom = '16px';
      
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.justifyContent = 'flex-end';
      buttonContainer.style.gap = '8px';
      
      const cancelBtn = document.createElement('button');
      cancelBtn.textContent = '取消';
      cancelBtn.style.padding = '8px 16px';
      cancelBtn.style.border = 'none';
      cancelBtn.style.borderRadius = '4px';
      cancelBtn.style.backgroundColor = '#7f8c8d';
      cancelBtn.style.color = 'white';
      cancelBtn.style.cursor = 'pointer';
      
      const saveBtn = document.createElement('button');
      saveBtn.textContent = '保存';
      saveBtn.style.padding = '8px 16px';
      saveBtn.style.border = 'none';
      saveBtn.style.borderRadius = '4px';
      saveBtn.style.backgroundColor = '#2ecc71';
      saveBtn.style.color = 'white';
      saveBtn.style.cursor = 'pointer';
      
      buttonContainer.appendChild(cancelBtn);
      buttonContainer.appendChild(saveBtn);
      
      dialogContent.appendChild(keyInput);
      dialogContent.appendChild(valueTextarea);
      dialogContent.appendChild(buttonContainer);
      
      dialog.appendChild(dialogHeader);
      dialog.appendChild(dialogContent);
      overlay.appendChild(dialog);
      
      document.body.appendChild(overlay);
      
      // 聚焦到 key 輸入框
      keyInput.focus();
      
      // 按鈕事件
      cancelBtn.onclick = function() {
        overlay.remove();
      };
      
      saveBtn.onclick = function() {
        const key = keyInput.value.trim();
        const value = valueTextarea.value;
        
        if (!key) {
          showNotification('請輸入 key 名稱', 'error');
          keyInput.focus();
          return;
        }
        
        if (localStorage.getItem(key) !== null) {
          if (!confirm(`鍵名 "${key}" 已存在！是否要覆蓋？`)) {
            return;
          }
        }
        
        try {
          localStorage.setItem(key, value);
          loadLocalStorageItems();
          showNotification(`項目 "${key}" 已保存`, 'success');
          overlay.remove();
        } catch (error) {
          showNotification(`保存失敗: ${error.message}`, 'error');
        }
      };
      
      // 按ESC關閉
      overlay.onkeydown = function(e) {
        if (e.key === 'Escape') {
          overlay.remove();
        }
      };
    }
    
    // 函數: 顯示通知
    function showNotification(message, type) {
      // 移除現有通知
      const existingNotifications = document.querySelectorAll('.lsm-notification');
      existingNotifications.forEach(n => n.remove());
      
      const notification = document.createElement('div');
      notification.className = `lsm-notification lsm-notification-${type}`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      // 觸發動畫
      setTimeout(() => {
        notification.classList.add('show');
      }, 10);
      
      // 自動消失
      setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
      }, 3000);
    }
    
    // 函數: 計算大小
    function calculateSize(value) {
      const bytes = new Blob([value]).size;
      if (bytes < 1024) {
        return bytes + ' B';
      } else if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + ' KB';
      } else {
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
      }
    }
    
    // 函數: 獲取值的類型
    function getValueType(value) {
      if (/^\d+$/.test(value)) return '數字';
      if (/^(true|false)$/.test(value)) return '布林值';
      if (value.length > 100) return '文本 (長)';
      return '文本';
    }
  })();