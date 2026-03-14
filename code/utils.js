// 通用工具函数

/**
 * 从文件名中提取架构类型
 */
function getArchFromFilename(filename) {
    const lower = filename.toLowerCase();
    if (lower.includes('arm64-v8a') || lower.includes('arm64')) return 'arm64';
    if (lower.includes('armeabi-v7a') || lower.includes('armv7')) return 'armeabi';
    if (lower.includes('x86_64') || lower.includes('x64')) return 'x86_64';
    if (lower.includes('x86') && !lower.includes('x86_64')) return 'x86';
    if (lower.includes('all') || lower.includes('universal')) return 'all';
    return 'other';
}

/**
 * 获取架构信息的图标和类名
 */
function getArchInfo(arch) {
    switch(arch) {
        case 'arm64': return { name: 'ARM64', icon: '📱', className: 'arch-arm64' };
        case 'armeabi': return { name: 'ARMv7', icon: '📲', className: 'arch-armeabi' };
        case 'x86': return { name: 'x86', icon: '💻', className: 'arch-x86' };
        case 'x86_64': return { name: 'x86_64', icon: '🖥️', className: 'arch-x86_64' };
        case 'all': return { name: '通用版', icon: '📦', className: 'arch-all' };
        default: return { name: '其他', icon: '📄', className: '' };
    }
}

/**
 * 格式化文件大小
 */
function formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * 格式化日期时间
 */
function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleString('zh-CN', { hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(/\//g, '-');
}

/**
 * 从文件名中提取 JRE 版本
 */
function getJreVersionFromFilename(filename) {
    const match = filename.match(/jre(\d+)/i);
    return match ? `jre${match[1]}` : 'JRE';
}