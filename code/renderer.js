// 渲染功能：负责生成下载卡片的HTML

/**
 * 生成 FCL 下载卡片 HTML（按架构分组）
 */
function renderFclCards(assets, mirrorPrefix) {
    // 按架构分组去重
    const archMap = new Map();
    assets.forEach(asset => {
        const arch = getArchFromFilename(asset.name);
        if (!archMap.has(arch)) archMap.set(arch, asset);
    });

    const archOrder = ['arm64', 'armeabi', 'x86_64', 'x86', 'all', 'other'];
    const sortedArchs = Array.from(archMap.keys()).sort((a, b) => archOrder.indexOf(a) - archOrder.indexOf(b));

    let cardsHtml = '';
    sortedArchs.forEach(arch => {
        const asset = archMap.get(arch);
        const archInfo = getArchInfo(arch);
        const sizeFormatted = formatSize(asset.size);
        const displayName = asset.name;
        const originalUrl = asset.browser_download_url;

        cardsHtml += `
            <div class="card">
                <div class="arch-icon">${archInfo.icon}</div>
                <div class="arch-name ${archInfo.className}">${archInfo.name}</div>
                <div class="file-info">
                    <span>📄 ${displayName}</span>
                    <span>💾 ${sizeFormatted}</span>
                </div>
                <a href="${mirrorPrefix}${originalUrl}" class="download-btn" target="_blank" rel="noopener" data-original-url="${originalUrl}">⬇️ 下载</a>
            </div>
        `;
    });
    
    return cardsHtml || '<div class="no-assets">⚠️ 暂无可用下载文件</div>';
}

/**
 * 生成 MobileGlues 下载卡片 HTML（直接列出所有文件）
 */
function renderMgCards(assets, mirrorPrefix) {
    let cardsHtml = '';
    assets.forEach(asset => {
        const sizeFormatted = formatSize(asset.size);
        const displayName = asset.name;
        const originalUrl = asset.browser_download_url;

        cardsHtml += `
            <div class="card">
                <div class="arch-icon">📦</div>
                <div class="arch-name">MobileGlues</div>
                <div class="file-info">
                    <span>📄 ${displayName}</span>
                    <span>💾 ${sizeFormatted}</span>
                </div>
                <a href="${mirrorPrefix}${originalUrl}" class="download-btn" target="_blank" rel="noopener" data-original-url="${originalUrl}">⬇️ 下载</a>
            </div>
        `;
    });
    
    return cardsHtml || '<div class="no-assets">⚠️ 暂无可用下载文件</div>';
}

/**
 * 生成 JRE 下载卡片 HTML（按文件名显示版本）
 */
function renderJreCards(assets, mirrorPrefix) {
    let cardsHtml = '';
    assets.forEach(asset => {
        const versionName = getJreVersionFromFilename(asset.name);
        const sizeFormatted = formatSize(asset.size);
        const displayName = asset.name;
        const originalUrl = asset.browser_download_url;

        cardsHtml += `
            <div class="card">
                <div class="arch-icon">☕</div>
                <div class="arch-name">${versionName}</div>
                <div class="file-info">
                    <span>📄 ${displayName}</span>
                    <span>💾 ${sizeFormatted}</span>
                </div>
                <a href="${mirrorPrefix}${originalUrl}" class="download-btn" target="_blank" rel="noopener" data-original-url="${originalUrl}">⬇️ 下载</a>
            </div>
        `;
    });
    
    return cardsHtml || '<div class="no-assets">⚠️ 暂无可用下载文件</div>';
}