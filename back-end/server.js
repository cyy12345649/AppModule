const express = require('express');
const app = express();
const port = 3000;

// 引入数据库
const db = require('./db/db.js')

// 引入路由模块
const greetRoutes = require('./routes/greet');
const participateRoutes = require('./routes/participate');

// 设置CORS
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有源
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

// 解析JSON格式的请求体
app.use(express.json());


// 使用路由模块
greetRoutes(app);
participateRoutes(app, db)


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});