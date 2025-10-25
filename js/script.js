// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 平滑滚动功能
    setupSmoothScrolling();
    
    // 导航栏滚动效果
    setupNavbarScroll();
    
    // 设置图片占位符
    setupPlaceholderImages();
});

// 复制服务器ID到剪贴板
function copyToClipboard(text) {
    // 创建一个临时输入框
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    
    // 选择并复制文本
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand('copy');
    
    // 移除临时输入框
    document.body.removeChild(input);
    
    // 显示复制成功提示
    showCopyNotification();
}

// 显示复制成功提示
function showCopyNotification() {
    // 检查是否已存在通知元素
    let notification = document.querySelector('.copy-notification');
    
    if (!notification) {
        // 创建通知元素
        notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = '服务器ID已复制到剪贴板！';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '50%';
        notification.style.transform = 'translateX(-50%)';
        notification.style.backgroundColor = '#2ecc71';
        notification.style.color = 'white';
        notification.style.padding = '10px 20px';
        notification.style.borderRadius = '5px';
        notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        document.body.appendChild(notification);
        
        // 显示通知
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // 3秒后隐藏通知
        setTimeout(() => {
            notification.style.opacity = '0';
            
            // 完全隐藏后移除元素
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// 设置平滑滚动
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('nav a, .footer-links a, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 检查链接是否指向页面内部锚点
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // 平滑滚动到目标元素
                    window.scrollTo({
                        top: targetElement.offsetTop - 60, // 减去导航栏高度
                        behavior: 'smooth'
                    });
                    
                    // 更新URL，但不滚动
                    history.pushState(null, null, href);
                }
            }
        });
    });
}

// 导航栏滚动效果
function setupNavbarScroll() {
    const navbar = document.querySelector('nav');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(52, 152, 219, 0.95)';
                navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'var(--secondary-color)';
                navbar.style.boxShadow = 'var(--box-shadow)';
            }
        });
    }
}

// 设置图片占位符
function setupPlaceholderImages() {
    const placeholders = document.querySelectorAll('.placeholder-image');
    
    placeholders.forEach((placeholder, index) => {
        // 设置不同的背景颜色
        const colors = ['#f39c12', '#3498db', '#e74c3c', '#2ecc71', '#9b59b6', '#1abc9c'];
        const colorIndex = index % colors.length;
        placeholder.style.backgroundColor = colors[colorIndex];
        
        // 添加图标和文本
        placeholder.innerHTML = '<i class="fas fa-image" style="font-size: 2rem; margin-bottom: 10px;"></i><p>图片占位符</p>';
        placeholder.style.display = 'flex';
        placeholder.style.flexDirection = 'column';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = 'white';
    });
}
