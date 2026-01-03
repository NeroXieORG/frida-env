# frida-env

搭建逆向环境，包含了 frida-ios-dump 、frida-tools 、 objection

frida-ios-dump: [frida-ios-dump 砸壳工具](./frida-ios-dump/README.md)

frida-ios: iOS frida hook 项目工程

## 环境配置

下载项目后，进入项目根目录下，创建 python 虚拟环境和 node 环境

```bash
# python 虚拟环境
python3.12 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# node 环境
npm install
```

## frida-ios-dump

在 frida 17+ 的环境下，使用 frida-ios-dump 可能会脱壳失败，这里降版本到 16.1.4

### 环境

iPhone：15.5
越狱工具：Dopamine
frida版本：16.1.4
frida-tools: 12.2.1 
frida-server: 16.1.4

frida-server 的版本要和 frida 保持一致，frida-server 导入到手机中

https://github.com/frida/frida/releases 下查找 16.1.4 对应的 frida_16.1.4_iphoneos-arm64.deb 文件并下载

```bash
# 上传到 iphone
scp frida_16.1.4_iphoneos-arm64.deb root@iphone_ip:/tmp/
# 使用 ssh 连接到 iphone 
ssh root@iphone_ip
cd /tmp
# root 级别就不需要添加sudo
dpkg -i frida_16.1.4_iphoneos-arm64.deb
```

### 砸壳

连接手机后

```bash
# 查看 bundle id
python frida-ios-dump/dump.py -l

# dump_ipa.py 用于一键砸壳
python frida-ios-dump/dump_ipa.py <app_bundle_id>
```

## frida-ios

### 项目结构

frida-ios 用于iOS逆向的项目工程

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

### 编译和运行

通过`npm run build` 生成最终的产物 `dist/bundle.js`，这也是 frida 最终注入的脚本

通过`bundle_id=com.example.app npm run start` 可以一键编译并运行

### 开发

所有的 hook 脚本都写在 `src/hook/` 目录下，`src/index.js` 作为入口文件，将 `src/hook/` 下的相关脚本 `require` 进来

```js
// src/index.js
require('./hook/ssl');
// require('./hook/socket');
// require('./hook/flutter');
```


