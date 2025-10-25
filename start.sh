#!/bin/bash

echo "正在检查 Node.js 是否已安装..."

if ! command -v node &> /dev/null; then
    echo "Node.js 未安装。请从 https://nodejs.org/ 下载并安装 Node.js。"
    echo "安装完成后，再次运行此脚本。"
    exit 1
fi

echo "Node.js 已安装，正在启动服务器..."
echo "服务器将在 http://localhost:3000 运行"
echo "按 Ctrl+C 停止服务器"

node index.js