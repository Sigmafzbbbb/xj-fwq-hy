const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

// 获取客户端IP地址的函数
function getClientIP(req) {
    // 优先检查X-Forwarded-For头，这通常包含了通过代理访问的客户端的原始IP
    const forwardedFor = req.headers['x-forwarded-for'];
    if (forwardedFor) {
        // X-Forwarded-For可能包含多个IP，第一个是客户端的原始IP
        return forwardedFor.split(',')[0].trim();
    }
    
    // 如果没有X-Forwarded-For头，则使用远程地址
    return req.socket.remoteAddress;
}

// 格式化当前时间的函数
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
}

const server = http.createServer((req, res) => {
    const ip = getClientIP(req);
    const time = getCurrentTime();
    
    // 在控制台显示访问信息
    console.log(`[${time}] 访问IP: ${ip} | 请求: ${req.url}`);
    
    // 处理根路径请求
    let filePath = req.url === '/' ? './index.html' : '.' + req.url;
    
    // 获取文件扩展名
    const extname = path.extname(filePath);
    let contentType = MIME_TYPES[extname] || 'application/octet-stream';
    
    // 读取文件
    fs.readFile(filePath, (err, content) => {
        if (err) {
            if (err.code === 'ENOENT') {
                // 文件不存在
                fs.readFile('./404.html', (err, content) => {
                    if (err) {
                        // 如果404.html也不存在
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end('<h1>404 Not Found</h1>', 'utf-8');
                    } else {
                        res.writeHead(404, { 'Content-Type': 'text/html' });
                        res.end(content, 'utf-8');
                    }
                    console.log(`[${time}] 404错误 | IP: ${ip} | 请求: ${req.url}`);
                });
            } else {
                // 服务器错误
                res.writeHead(500);
                res.end(`服务器错误: ${err.code}`);
                console.log(`[${time}] 500错误 | IP: ${ip} | 请求: ${req.url} | 错误: ${err.code}`);
            }
        } else {
            // 成功响应
            res.writeHead(200, { 'Content-Type': contentType });
            res.end(content, 'utf-8');
        }
    });
});

server.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
    console.log('按 Ctrl+C 停止服务器');
    console.log('访问日志将显示在此控制台中');
});