// routes/participate.js
// 用于用户参加活动时的动作

module.exports = function(app, db) {    
    // 处理POST请求
    /**
     * in ： userId
     * out: status
     *      0: null
     *      -1: not eligible
     *      1： already participated
     *      2： Administrator
     */
    app.post('/api/check-user_activity_participation_status', (req, res) => {
        const data = req.body;
        const userId = data.userId;
        
        var userStatus;
        
        // 从数据库中检查用户参加活动的状态
        db.selectAll("select * from user_activity_participation_status where userId = '" + userId + "' ", (e, r) => {
            let tt = r.length;
            console.log(tt, r);
            if (tt == 1) {
                userStatus = r[0].status;
            } else {
                userStatus = 0;
            }
            console.log("/api/check-user_activity_participation_status: ", userId, userStatus);
            
            res.json({ status: userStatus });
        })

        
    });
};