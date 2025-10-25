// 移动端滚动时隐藏导航栏
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('nav');
    let lastScroll = 0;
    const scrollThreshold = 5; // 滚动阈值
    
    if (header) {
        // 添加过渡效果
        header.style.transition = 'transform 0.3s ease-in-out';
        
        window.addEventListener('scroll', function() {
            const currentScroll = window.pageYOffset;
            
            if (Math.abs(currentScroll - lastScroll) > scrollThreshold) {
                if (currentScroll > lastScroll && currentScroll > 50) {
                    // 向下滚动时隐藏
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // 向上滚动或回到顶部时显示
                    header.style.transform = 'translateY(0)';
                }
                lastScroll = currentScroll;
            }
        });
    }
});
