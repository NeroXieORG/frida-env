# frida-env

搭建逆向环境，包含了 frida-ios-dump 、frida-tools 、 objection

frida-ios-dump: [frida-ios-dump](./frida-ios-dump/README.md)

frida-project: 开发 frida hook 的项目环境

## Usage

下载项目后，进入项目根目录下，创建虚拟环境

```bash
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

## frida-ios

frida-ios 使用用于iOS逆向的项目工程，

```
frida-ios/
├── package.json              # 可选： npm 项目描述
├── tsconfig.json             # 可选：以后上 TS 再用
├── build.sh                  # 一键编译脚本（必须）
│
├── src/                      # ⭐ 所有源码都在这里
│   ├── index.js              # ⭐ 入口文件（唯一入口）
│   │
│   ├── hooks/                # 各类 hook
│   │   ├── ssl.js
│   │   ├── socket.js
│   │   └── flutter.js
│   │
│   └── utils/                # 工具函数
│       └── class_helper.js
│
└── dist/
    └── bundle.js              # ⭐ frida-compile 输出（只注入这个）
```

通过`build.sh` 生成最终的产物 `dist/bundle.js`，这也是 frida 最终注入的脚本

