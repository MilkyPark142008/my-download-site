// 主逻辑：数据加载和页面交互

(function() {
    // 获取DOM元素
    const fclModule = document.getElementById('fclModule');
    const mgModule = document.getElementById('mgModule');
    const jreModule = document.getElementById('jreModule');
    const mirrorSelect = document.getElementById('mirrorSelect');
    
    // 更新下载按钮链接
    function updateAllDownloadButtons() {
        const prefix = mirrorSelect.value;
        document.querySelectorAll('.download-btn').forEach(btn => {
            const original = btn.getAttribute('data-original-url');
            if (original) {
                btn.href = prefix ? prefix + original : original;
            }
        });
    }
    
    if (mirrorSelect) {
        mirrorSelect.addEventListener('change', updateAllDownloadButtons);
    }

    // 模块切换功能
    window.switchModule = function(moduleName) {
        // 隐藏所有模块
        fclModule.style.display = 'none';
        mgModule.style.display = 'none';
        jreModule.style.display = 'none';
        
        // 显示选中的模块
        const activeModule = moduleName === 'fcl' ? fclModule : 
                            moduleName === 'mg' ? mgModule : jreModule;
        activeModule.style.display = 'block';
        
        // 同步下拉选择器
        const projectSelect = document.getElementById('projectSelect');
        if (projectSelect) {
            projectSelect.value = moduleName;
        }
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    // 下拉选择器变化处理
    window.handleProjectChange = function() {
        const projectSelect = document.getElementById('projectSelect');
        if (!projectSelect) return;
        
        switchModule(projectSelect.value);
    };

    // 加载数据并显示
    async function loadModuleData(jsonPath, versionElement, timeElement, 
                                  changelogElement, containerElement, renderFunc) {
        containerElement.innerHTML = '<div class="loading">⏳ 加载版本信息中...</div>';
        
        try {
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error(`无法获取 ${jsonPath} (HTTP ${response.status})`);
            
            const data = await response.json();
            
            // 更新版本信息
            versionElement.textContent = data.tag_name || '未知版本';
            const published = data.published_at;
            timeElement.textContent = published ? formatDate(published) : '';
            
            // 更新更新日志
            changelogElement.innerHTML = (data.body || '暂无更新日志').replace(/</g, '<').replace(/>/g, '>');
            
            // 渲染下载列表
            const assets = data.assets || [];
            const mirrorPrefix = mirrorSelect ? mirrorSelect.value : '';
            containerElement.innerHTML = renderFunc(assets, mirrorPrefix);
            
        } catch (error) {
            console.error('加载失败:', error);
            containerElement.innerHTML = `<div class="no-assets">❌ 加载失败，请稍后重试。<br>${error.message}</div>`;
            versionElement.textContent = '加载失败';
            changelogElement.innerHTML = '加载失败';
        }
    }

    // ===== 加载 FCL 启动器数据 =====
    loadModuleData(
        '/data/fcl.json',
        document.getElementById('fclVersionBadge'),
        document.getElementById('fclUpdateTime'),
        document.getElementById('fclChangelogContent'),
        document.getElementById('downloadContainer'),
        renderFclCards
    );

    // ===== 加载 MobileGlues 数据 =====
    loadModuleData(
        '/data/mobileglues.json',
        document.getElementById('mgVersionBadge'),
        document.getElementById('mgUpdateTime'),
        document.getElementById('mgChangelogContent'),
        document.getElementById('mgContainer'),
        renderMgCards
    );

    // ===== 加载 JRE 数据 =====
    loadModuleData(
        '/data/jre.json',
        document.getElementById('jreVersionBadge'),
        document.getElementById('jreUpdateTime'),
        document.getElementById('jreChangelogContent'),
        document.getElementById('jreContainer'),
        renderJreCards
    );

    // 菜单切换
    window.toggleMenu = function() {
        const menu = document.getElementById('sideMenu');
        const toggleBtn = document.getElementById('menuToggle');
        menu.classList.toggle('active');
        toggleBtn.classList.toggle('active');
    };
    
    // 点击遮罩关闭菜单
    document.addEventListener('click', function(e) {
        const menu = document.getElementById('sideMenu');
        const toggleBtn = document.getElementById('menuToggle');
        if (!menu.contains(e.target) && !toggleBtn.contains(e.target) && menu.classList.contains('active')) {
            toggleMenu();
        }
    });
    
    // 风格切换器
    window.switchStyle = function(styleName) {
        // 更新CSS链接
        const styleLink = document.getElementById('currentStyle');
        if (styleLink) {
            styleLink.href = `code/styles/${styleName}.css`;
        }
        
        // 更新侧边菜单中的按钮状态
        document.querySelectorAll('.style-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        const activeMenuBtn = document.getElementById(`${styleName}MenuBtn`);
        if (activeMenuBtn) {
            activeMenuBtn.classList.add('active');
        }
        
        // 保存用户偏好到localStorage
        localStorage.setItem('preferredStyle', styleName);
    };
    
    // 页面加载时恢复用户偏好
    (function() {
        const preferredStyle = localStorage.getItem('preferredStyle');
        if (preferredStyle) {
            switchStyle(preferredStyle);
        }
    })();
})();