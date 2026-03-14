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
        const zalithModule = document.getElementById('zalithModule');
        if (zalithModule) zalithModule.style.display = 'none';
        
        // 显示选中的模块
        const activeModule = moduleName === 'fcl' ? fclModule : 
                            moduleName === 'mg' ? mgModule : 
                            moduleName === 'zalith' ? zalithModule : jreModule;
        if (activeModule) activeModule.style.display = 'block';
        
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
                                  changelogElement, containerElement, renderFunc, dataObj) {
        containerElement.innerHTML = '<div class="loading">⏳ 加载版本信息中...</div>';
        
        try {
            let data;
            if (dataObj) {
                // 直接使用传入的数据对象
                data = dataObj;
            } else {
                // 从 URL 获取数据
                const response = await fetch(jsonPath);
                if (!response.ok) throw new Error(`无法获取 ${jsonPath} (HTTP ${response.status})`);
                data = await response.json();
            }
            
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
    (async function loadFcl() {
        try {
            const response = await fetch('/data/fcl.json');
            if (!response.ok) throw new Error('无法获取 FCL 数据');
            
            const data = await response.json();
            
            // 加载 Release
            if (data.release) {
                loadModuleData(
                    null,
                    document.getElementById('fclVersionBadge'),
                    document.getElementById('fclUpdateTime'),
                    document.getElementById('fclChangelogContent'),
                    document.getElementById('downloadContainer'),
                    renderFclCards,
                    data.release
                );
            }
            
            // 加载 Action
            if (data.action && data.action.run && data.action.artifacts) {
                const actionContainer = document.getElementById('actionContainer');
                actionContainer.innerHTML = '<div class="loading">⏳ 加载 Action 构建产物中...</div>';
                
                const runId = data.action.run.id;
                const artifacts = data.action.artifacts;
                let html = '<div class="run-info">运行 #' + runId + ' | ' + formatDate(data.action.run.created_at) + '</div>';
                
                artifacts.forEach(artifact => {
                    const htmlUrl = `https://github.com/FCL-Team/FoldCraftLauncher/actions/runs/${runId}`;
                    html += `
                        <div class="download-card">
                            <div class="file-info">
                                <div class="file-name">${artifact.name}</div>
                                <div class="file-meta">
                                    <span>📦 ${formatSize(artifact.size_in_bytes)}</span>
                                </div>
                            </div>
                            <a href="${htmlUrl}" class="download-btn" target="_blank" rel="noopener noreferrer">
                                下载
                            </a>
                        </div>
                    `;
                });
                
                actionContainer.innerHTML = html;
            }
        } catch (error) {
            console.error('加载 FCL 失败:', error);
            document.getElementById('downloadContainer').innerHTML = `<div class="no-assets">❌ 加载失败<br>${error.message}</div>`;
        }
    })();

    // ===== 下载类型切换功能 =====
    window.selectDownloadType = function(type) {
        const releaseSection = document.getElementById('releaseSection');
        const actionSection = document.getElementById('actionSection');
        const buttons = document.querySelectorAll('.selector-btn');
        
        // 更新按钮状态
        buttons.forEach(btn => {
            if (btn.getAttribute('data-type') === type) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 切换显示区域
        if (type === 'release') {
            releaseSection.style.display = 'block';
            actionSection.style.display = 'none';
        } else {
            releaseSection.style.display = 'none';
            actionSection.style.display = 'block';
        }
    };

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

    // ===== 加载 ZalithLauncher2 数据 =====
    (async function loadZalith() {
        try {
            const response = await fetch('/data/zalith.json');
            if (!response.ok) throw new Error('无法获取 Zalith 数据');
            
            const data = await response.json();
            
            // 加载 Release
            if (data.release) {
                const container = document.getElementById('zalithReleaseContainer');
                const versionBadge = document.getElementById('zalithVersionBadge');
                const updateTime = document.getElementById('zalithUpdateTime');
                const changelogContent = document.getElementById('zalithChangelogContent');
                
                container.innerHTML = '<div class="loading">⏳ 加载版本信息中...</div>';
                
                // 更新版本信息
                versionBadge.textContent = data.release.tag_name || '未知版本';
                const published = data.release.published_at;
                updateTime.textContent = published ? formatDate(published) : '';
                
                // 更新更新日志
                changelogContent.innerHTML = (data.release.body || '暂无更新日志').replace(/</g, '<').replace(/>/g, '>');
                
                // 渲染下载列表
                const assets = data.release.assets || [];
                const mirrorPrefix = mirrorSelect ? mirrorSelect.value : '';
                container.innerHTML = renderZalithCards(assets, mirrorPrefix);
            }
            
            // 加载 Action
            if (data.action && data.action.run && data.action.artifacts) {
                const actionContainer = document.getElementById('zalithActionContainer');
                actionContainer.innerHTML = '<div class="loading">⏳ 加载 Action 构建产物中...</div>';
                
                const runId = data.action.run.id;
                const artifacts = data.action.artifacts;
                let html = '<div class="run-info">运行 #' + runId + ' | ' + formatDate(data.action.run.created_at) + '</div>';
                
                artifacts.forEach(artifact => {
                    const htmlUrl = `https://github.com/ZalithLauncher/ZalithLauncher2/actions/runs/${runId}`;
                    html += `
                        <div class="download-card">
                            <div class="file-info">
                                <div class="file-name">${artifact.name}</div>
                                <div class="file-meta">
                                    <span>📦 ${formatSize(artifact.size_in_bytes)}</span>
                                </div>
                            </div>
                            <a href="${htmlUrl}" class="download-btn" target="_blank" rel="noopener noreferrer">
                                下载
                            </a>
                        </div>
                    `;
                });
                
                actionContainer.innerHTML = html;
            }
        } catch (error) {
            console.error('加载 Zalith 失败:', error);
            document.getElementById('zalithReleaseContainer').innerHTML = `<div class="no-assets">❌ 加载失败<br>${error.message}</div>`;
        }
    })();

    // ===== ZalithLauncher2 下载类型切换功能 =====
    window.selectZalithDownloadType = function(type) {
        const releaseSection = document.getElementById('zalithReleaseSection');
        const actionSection = document.getElementById('zalithActionSection');
        const buttons = document.querySelectorAll('#zalithModule .selector-btn');
        
        // 更新按钮状态
        buttons.forEach(btn => {
            if (btn.getAttribute('data-type') === type) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // 切换显示区域
        if (type === 'release') {
            releaseSection.style.display = 'block';
            actionSection.style.display = 'none';
        } else {
            releaseSection.style.display = 'none';
            actionSection.style.display = 'block';
        }
    };

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

    // ===== 加载源码最新提交信息（简洁版） =====
    (async function loadCommitInfo() {
        const commitInfoDiv = document.getElementById('commitInfo');
        if (!commitInfoDiv) return;

        try {
            const response = await fetch('/data/commit-info.json');

            if (!response.ok) throw new Error();

            const data = await response.json();
            if (data && data.message === '等待首次提交...') {
                commitInfoDiv.innerHTML = '<p>❌ 加载失败</p>';
                return;
            }
            if (data && data.date) {
                const date = formatDate(data.date);
                const sha = data.sha ? data.sha.substring(0, 7) : '';
                const shortMsg = data.message ? data.message.substring(0, 30) : '';
                commitInfoDiv.innerHTML = `<p>📅 ${date}</p><p class="commit-msg">📝 ${shortMsg}...</p><p class="commit-sha">#${sha}</p>`;
            } else {
                commitInfoDiv.innerHTML = '<p>❌ 加载失败</p>';
            }
        } catch (error) {
            commitInfoDiv.innerHTML = '<p>❌ 加载失败</p>';
        }
    })();
    
})();