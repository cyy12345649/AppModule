// routes/greet.js
// 用于测试
module.exports = function(app) {
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
};