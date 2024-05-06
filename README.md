
## Requirements
1. node : 12.22.9
2. npm  : 8.5.1

- change npm registry （换源后记得重启终端，如果在编辑器中使用集成终端，需要重启编辑器）
sudo npm config set registry https://registry.npmmirror.com --global

- check npm registry
npm config get registry
- install express.js
npm install express@4.17.1 --registry=https://registry.npmmirror.com
- install vue2
npm install  @vue/cli
sudo npm install -g @vue/cli --registry=https://registry.npmmirror.com