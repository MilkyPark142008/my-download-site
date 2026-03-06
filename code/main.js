// 主逻辑：数据加载和页面交互

(function() {
    // 镜像选择器
    const mirrorSelect = document.getElementById('mirrorSelect');
    
    function updateAllDownloadButtons() {
        const prefix = mirrorSelect.value;
        document.querySelectorAll('.download-btn').forEach(btn => {
            const original = btn.getAttribute('data-original-url');
            if (original) {
                btn.href = prefix ? prefix + original : original;
            }
        });
    }
    mirrorSelect.addEventListener('change', updateAllDownloadButtons);

    // 项目选择器
    const projectSelect = document.getElementById('projectSelect');
    const fclModule = document.getElementById('fclModule');
    const mgModule = document.getElementById('mgModule');
    const jreModule = document.getElementById('jreModule');
    
    projectSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        fclModule.style.display = val === 'fcl' ? 'block' : 'none';
        mgModule.style.display = val === 'mg' ? 'block' : 'none';
        jreModule.style.display = val === 'jre' ? 'block' : 'none';
    });

    // 通用折叠功能
    function setupCollapse(header, arrow, container, isCollapsed) {
        header.classList.add('collapsed');
        arrow.textContent = '▶';
        
        header.addEventListener('click', () => {
            isCollapsed = !isCollapsed;
            if (isCollapsed) {
                header.classList.add('collapsed');
                arrow.textContent = '▶';
                container.style.display = 'none';
            } else {
                header.classList.remove('collapsed');
                arrow.textContent = '▼';
                container.style.display = 'grid';
            }
        });
    }

    // 加载数据并显示
    async function loadModuleData(jsonPath, versionTagElement, versionTimeElement, 
                                  changelogContentElement, containerElement, renderFunc) {
        containerElement.innerHTML = '<div class="loading">⏳ 加载版本信息中...</div>';
        
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error(`无法获取 ${jsonPath} (HTTP ${response.status})`);
            
            const data = await response.json();
            
            // 更新版本信息
            versionTagElement.textContent = `📌 最新: ${data.tag_name || '未知版本'}`;
            const published = data.published_at;
            versionTimeElement.textContent = published ? `🕒 ${formatDate(published)}` : '';
            
            // 更新更新日志
            changelogContentElement.innerHTML = (data.body || '暂无更新日志').replace(/</g, '<').replace(/>/g, '>');
            
            // 渲染下载卡片
            const assets = data.assets || [];
            containerElement.innerHTML = renderFunc(assets, mirrorSelect.value);
            
        } catch (error) {
            console.error('加载失败:', error);
            containerElement.innerHTML = `<div class="no-assets">❌ 加载失败，请稍后重试。<br>${error.message}</div>`;
            versionTagElement.textContent = '📌 最新: 加载失败';
            changelogContentElement.innerHTML = '加载失败';
        }
    }

    // ===== FCL 启动器模块 =====
    const fclHeader = document.getElementById('fclHeader');
    const toggleArrow = document.getElementById('toggleArrow');
    const fclContainer = document.getElementById('downloadContainer');
    const fclVersionTag = document.querySelector('#fclVersionInfo .version-tag');
    const fclVersionTime = document.querySelector('#fclVersionInfo span:last-child');
    const fclChangelogContent = document.getElementById('fclChangelogContent');
    
    let isFclCollapsed = true;
    setupCollapse(fclHeader, toggleArrow, fclContainer, isFclCollapsed);
    loadModuleData('/data/fcl.json', fclVersionTag, fclVersionTime, fclChangelogContent, fclContainer, renderFclCards);

    // ===== MobileGlues 模块 =====
    const mgHeader = document.getElementById('mgHeader');
    const mgArrow = document.getElementById('mgArrow');
    const mgContainer = document.getElementById('mgContainer');
    const mgVersionTag = document.querySelector('#mgVersionInfo .version-tag');
    const mgVersionTime = document.querySelector('#mgVersionInfo span:last-child');
    const mgChangelogContent = document.getElementById('mgChangelogContent');
    
    let isMgCollapsed = true;
    setupCollapse(mgHeader, mgArrow, mgContainer, isMgCollapsed);
    loadModuleData('/data/mobileglues.json', mgVersionTag, mgVersionTime, mgChangelogContent, mgContainer, renderMgCards);

    // ===== JRE 模块 =====
    const jreHeader = document.getElementById('jreHeader');
    const jreArrow = document.getElementById('jreArrow');
    const jreContainer = document.getElementById('jreContainer');
    const jreVersionTag = document.querySelector('#jreVersionInfo .version-tag');
    const jreVersionTime = document.querySelector('#jreVersionInfo span:last-child');
    const jreChangelogContent = document.getElementById('jreChangelogContent');
    
    let isJreCollapsed = true;
    setupCollapse(jreHeader, jreArrow, jreContainer, isJreCollapsed);
    loadModuleData('/data/jre.json', jreVersionTag, jreVersionTime, jreChangelogContent, jreContainer, renderJreCards);
})();