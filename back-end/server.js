const express = require('express');
const app = express();
const port = 3000;

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); // 允许所有源
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});
app.use(express.json()); // 解析JSON格式的请求体


// 处理GET请求，返回欢迎信息
app.get('/api/greet', (req, res) => {
  console.log("GET: /api/greet");
  res.json({ message: 'Hello! Please send your name.' });
});

// 处理POST请求，接收用户输入的姓名并返回问候语
app.post('/api/greet', (req, res) => {
  const name = req.body.name;
  const greeting = `Hello, ${name}!`;
  console.log("POST: ", name);

  res.json({ message: greeting });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});