// inject.js - 被注入到頁面的腳本，包含側邊欄的所有功能
(function() {
    // 如果已經存在側邊欄，則不重複添加
    if (document.getElementById('localStorage-manager-sidebar')) {
      return;
    }
  
    // 創建側邊欄容器
    const sidebarContainer = document.createElement('div');
    sidebarContainer.id = 'localStorage-manager-sidebar';
    sidebarContainer.style.position = 'fixed';
    sidebarContainer.style.top = '0';
    sidebarContainer.style.right = '0';
    sidebarContainer.style.width = '300px';
    sidebarContainer.style.height = '100%';
    sidebarContainer.style.backgroundColor = '#fff';
    sidebarContainer.style.boxShadow = '-2px 0 5px rgba(0,0,0,0.2)';
    sidebarContainer.style.zIndex = '9999';
    sidebarContainer.style.overflow = 'auto';
    sidebarContainer.style.padding = '10px';
    sidebarContainer.style.boxSizing = 'border-box';
    sidebarContainer.style.fontFamily = 'Arial, sans-serif';
    sidebarContainer.style.fontSize = '14px';
    sidebarContainer.style.color = '#333';
  
    // 標題部分
    const header = document.createElement('div');
    header.style.borderBottom = '1px solid #ddd';
    header.style.paddingBottom = '10px';
    header.style.marginBottom = '15px';
    header.style.display = 'flex';
    header.style.justifyContent = 'space-between';
    header.style.alignItems = 'center';
    
    const title = document.createElement('h3');
    title.textContent = 'localStorage 管理器';
    title.style.margin = '0';
    
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.border = 'none';
    closeButton.style.background = 'none';
    closeButton.style.fontSize = '16px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = '#666';
    closeButton.onclick = function() {
      const sidebar = document.getElementById('localStorage-manager-sidebar');
      if (sidebar) sidebar.remove();
    };
    
    header.appendChild(title);
    header.appendChild(closeButton);
    
    sidebarContainer.appendChild(header);
  
    // 搜尋功能
    const searchContainer = document.createElement('div');
    searchContainer.style.marginBottom = '15px';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = '搜尋 key...';
    searchInput.style.width = '100%';
    searchInput.style.padding = '8px 10px';
    searchInput.style.boxSizing = 'border-box';
    searchInput.style.border = '1px solid #ddd';
    searchInput.style.borderRadius = '4px';
    
    searchContainer.appendChild(searchInput);
    sidebarContainer.appendChild(searchContainer);
  
    // 添加按鈕
    const addButton = document.createElement('button');
    addButton.textContent = '新增項目';
    addButton.style.backgroundColor = '#4CAF50';
    addButton.style.color = 'white';
    addButton.style.border = 'none';
    addButton.style.padding = '8px 12px';
    addButton.style.borderRadius = '4px';
    addButton.style.cursor = 'pointer';
    addButton.style.width = '100%';
    addButton.style.marginBottom = '15px';
    
    sidebarContainer.appendChild(addButton);
  
    // 項目列表容器
    const itemsContainer = document.createElement('div');
    itemsContainer.id = 'localStorage-items-container';
    sidebarContainer.appendChild(itemsContainer);
  
    // 將側邊欄添加到頁面
    document.body.appendChild(sidebarContainer);
    
    // 加載 localStorage 項目
    loadLocalStorageItems();
    
    // 設置事件監聽器
    searchInput.oninput = function() {
      filterItems(this.value);
    };
    
    addButton.onclick = addNewItem;
    
    // 監聽 localStorage 變化
    window.addEventListener('storage', function(event) {
      loadLocalStorageItems();
    });
    
    // 加載 localStorage 項目的函數
    function loadLocalStorageItems() {
      const container = document.getElementById('localStorage-items-container');
      // 清空容器
      if (container) {
        container.innerHTML = '';
        
        if (localStorage.length === 0) {
          const emptyMsg = document.createElement('p');
          emptyMsg.textContent = '沒有 localStorage 項目';
          emptyMsg.style.textAlign = 'center';
          emptyMsg.style.color = '#888';
          container.appendChild(emptyMsg);
          return;
        }
        
        // 遍歷所有 localStorage 項目
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
    }
    
    // 創建每個 localStorage 項目的元素
    function createItemElement(key, value, container) {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'localStorage-item';
      itemDiv.setAttribute('data-key', key);
      itemDiv.style.border = '1px solid #ddd';
      itemDiv.style.borderRadius = '4px';
      itemDiv.style.padding = '10px';
      itemDiv.style.marginBottom = '10px';
      itemDiv.style.backgroundColor = '#f9f9f9';
      
      // Key 標題
      const keyHeader = document.createElement('div');
      keyHeader.style.fontWeight = 'bold';
      keyHeader.style.marginBottom = '8px';
      keyHeader.style.wordBreak = 'break-all';
      keyHeader.textContent = key;
      itemDiv.appendChild(keyHeader);
      
      // Value 文本框
      const valueInput = document.createElement('textarea');
      valueInput.style.width = '100%';
      valueInput.style.minHeight = '60px';
      valueInput.style.padding = '5px';
      valueInput.style.marginBottom = '8px';
      valueInput.style.boxSizing = 'border-box';
      valueInput.style.border = '1px solid #ddd';
      valueInput.style.borderRadius = '4px';
      valueInput.style.fontFamily = 'monospace';
      valueInput.style.fontSize = '12px';
      valueInput.value = value;
      itemDiv.appendChild(valueInput);
      
      // 操作按鈕容器
      const actionsDiv = document.createElement('div');
      actionsDiv.style.display = 'flex';
      actionsDiv.style.justifyContent = 'space-between';
      
      // 更新按鈕
      const updateBtn = document.createElement('button');
      updateBtn.textContent = '更新';
      updateBtn.style.backgroundColor = '#2196F3';
      updateBtn.style.color = 'white';
      updateBtn.style.border = 'none';
      updateBtn.style.padding = '6px 12px';
      updateBtn.style.borderRadius = '4px';
      updateBtn.style.cursor = 'pointer';
      updateBtn.style.flex = '1';
      updateBtn.style.marginRight = '5px';
      
      updateBtn.onclick = function() {
        try {
          localStorage.setItem(key, valueInput.value);
          showNotification(`項目 "${key}" 已更新`, 'success');
        } catch (error) {
          showNotification(`更新失敗: ${error.message}`, 'error');
        }
      };
      actionsDiv.appendChild(updateBtn);
      
      // 刪除按鈕
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '刪除';
      deleteBtn.style.backgroundColor = '#f44336';
      deleteBtn.style.color = 'white';
      deleteBtn.style.border = 'none';
      deleteBtn.style.padding = '6px 12px';
      deleteBtn.style.borderRadius = '4px';
      deleteBtn.style.cursor = 'pointer';
      deleteBtn.style.flex = '1';
      
      deleteBtn.onclick = function() {
        if (confirm(`確定要刪除 "${key}" 嗎？`)) {
          try {
            localStorage.removeItem(key);
            itemDiv.remove();
            
            // 如果刪除後沒有項目，顯示空訊息
            if (localStorage.length === 0) {
              loadLocalStorageItems();
            }
            
            showNotification(`項目 "${key}" 已刪除`, 'success');
          } catch (error) {
            showNotification(`刪除失敗: ${error.message}`, 'error');
          }
        }
      };
      actionsDiv.appendChild(deleteBtn);
      
      itemDiv.appendChild(actionsDiv);
      container.appendChild(itemDiv);
    }
    
    // 過濾項目的函數
    function filterItems(searchTerm) {
      searchTerm = searchTerm.toLowerCase();
      const items = document.querySelectorAll('.localStorage-item');
      
      items.forEach(item => {
        const key = item.getAttribute('data-key').toLowerCase();
        if (key.includes(searchTerm)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    }
    
    // 添加新項目的函數
    function addNewItem() {
      const key = prompt('請輸入新的key:');
      if (!key) return;
      
      if (localStorage.getItem(key) !== null) {
        showNotification(`鍵名 "${key}" 已存在！`, 'error');
        return;
      }
      
      const value = prompt('請輸入值:');
      if (value === null) return; // 用戶取消
      
      try {
        localStorage.setItem(key, value);
        loadLocalStorageItems();
        showNotification(`項目 "${key}" 已新增`, 'success');
      } catch (error) {
        showNotification(`新增失敗: ${error.message}`, 'error');
      }
    }
    
    // 顯示通知的函數
    function showNotification(message, type) {
      const notification = document.createElement('div');
      notification.textContent = message;
      notification.style.position = 'fixed';
      notification.style.bottom = '20px';
      notification.style.right = '320px';
      notification.style.padding = '10px 15px';
      notification.style.borderRadius = '4px';
      notification.style.color = 'white';
      notification.style.zIndex = '10000';
      
      if (type === 'success') {
        notification.style.backgroundColor = '#4CAF50';
      } else if (type === 'error') {
        notification.style.backgroundColor = '#f44336';
      }
      
      document.body.appendChild(notification);
      
      // 2秒後自動消失
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => notification.remove(), 500);
      }, 2000);
    }
  })();