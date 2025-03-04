# 宝宝游戏

一个面向儿童的HTML5教育游戏集合。

## 游戏列表

1. 点单词
   - 九宫格显示英文单词
   - 语音读出目标单词
   - 点击正确单词进入下一轮
   - 错误可以重试

2. 点数字
   - 九宫格显示1-100的随机数字
   - 语音读出目标数字
   - 点击正确数字进入下一轮
   - 错误可以重试

3. 点动物（开发中）
   - 即将推出

## 项目结构

```
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── games/             # 游戏模块
│   │   ├── game-base.js   # 游戏基类
│   │   ├── word/         # 点单词游戏
│   │   ├── number/       # 点数字游戏
│   │   └── animal/       # 点动物游戏
│   └── main.js           # 主程序入口
└── index.html            # 主页面
```

## 技术特点

- 纯前端实现，无需后端
- 使用ES6+模块化开发
- 面向对象的游戏框架设计
- 响应式布局，支持移动设备
- Web Speech API实现语音播报

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/yourusername/baby-game.git
cd baby-game
```

2. 启动本地服务器
```bash
python3 -m http.server 8000
```

3. 访问游戏
```
http://localhost:8000
```

## 在线体验

访问：[Cloudflare Pages URL]

## 贡献指南

1. Fork 本仓库
2. 创建新分支 `git checkout -b feature/your-feature`
3. 提交更改 `git commit -am 'Add some feature'`
4. 推送到分支 `git push origin feature/your-feature`
5. 提交 Pull Request
