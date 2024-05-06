// 可以通过此文件参考对db.js的使用

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const db = require('./db/db.js')

const onlineUsers = new Map()


io.on('connection', function(socket) {
    console.log('A client connected: ', socket.id);

    // 注册
    socket.on('signup', function(data) {
        console.log("signup")
        // 连接数据库验证
        db.selectAll("select * from user where id = '" + data.id + "' ", (e, r) => {
            let tt = r.length;
            if (tt == 1) {
                console.log("ID已经被注册")
                socket.emit('signupFail')
            } else {
                let saveData = data
                //注册
                db.insertData('user', saveData, (e, r) => {
                    console.log('注册成功')
                    socket.emit('signupSuccess')

                })
            }
        })
    });

    //注销
    socket.on('cancelAccount', function(user_id) {
        db.deleteData("user", {id: user_id}, (e, r) => {
            console.log(e, r)
            console.log("注销账户：", user_id);
            delete onlineUsers[user_id];
            socket.emit("cancelAccountSuccess")

        })
    });

    //登录
    socket.on('login', function(data) {
        // 连接数据库验证
        let msg = '', resultData = '';
        db.selectAll("select * from user where id ='" + data.id + "' ", (e, r) => {
            let tt = r.length;
            if (tt == 0) {
                msg = "用户名不存在";
            } else if (data.password != r[0].password) {
                msg = "用户密码错误";
            } else {
                resultData = r[0];
                msg = "用户密码正确"
                console.log(typeof data.id)
                console.log(typeof resultData.id)
                onlineUsers.set(resultData.id, socket.id)
                console.log(onlineUsers)
            }
            console.log(msg);
            socket.emit('checkoutAnswer', {
                msg: msg,
                id: resultData.id,
                avatar: resultData.avatar,
                nickname: resultData.nickname,
            })
            // console.log(msg, resultData)
        })
    });

    //返回通讯录数据
    socket.on('requestContacts', (user_id)=>{
        let friends = [];
        db.selectAll("call query_contacts('" + user_id + "') ", (e, res) => {
            // console.log(res);
            // console.log(r[0])
            friends.splice(0, friends.length);
            for (var i = 0; i < res[0].length; i++) {
                friends.push({
                    friend_id: res[0][i].friend_id,
                    avatar: null,
                    remark: res[0][i].remark,
                    chat_id: res[0][i].chat_id,
                })
            }
            socket.emit('returnContacts', friends)
        })
        // db.selectAll("select * from contacts where user_id ='" + user_id + "' ", (e, res) => {
        //         // console.log(res);
        //         // console.log(r[0])
        //         friends.splice(0, friends.length);
        //         for (var i = 0; i < res.length; i++) {
        //             friends.push({
        //                 friend_id: res[i].friend_id,
        //                 avatar: null,
        //                 remark: res[i].remark,
        //                 chat_id: res[i].chat_id,
        //             })
        //         }
        //         socket.emit('returnContacts', friends)
        // })
    })

    //返回聊天数据
    socket.on('requestChats', (user_id)=>{
        let chats = [];
        db.selectAll("select * from view_pc_outline where user_id ='" + user_id + "' ", (e, res) => {
            // console.log(res);
            // console.log(r[0])
            chats.splice(0, chats.length);
            for (var i = 0; i < res.length; i++) {
                chats.push({
                    chat_with_id: res[i].chat_with_id,
                    remark: res[i].remark,
                    chat_id: res[i].chat_id,
                    last_msg_time: res[i].last_msg_time,
                    last_msg: res[i].last_msg,
                })
            }
            socket.emit('returnChats', chats)
        })
    })

    //返回聊天消息
    socket.on('requestMsgs', (chat_id)=>{
        let msgs = [];
        db.selectAll("select * from private_chat_message where chat_id ='" + chat_id + "' ", (e, res) => {
            // console.log(res);
            // console.log(r[0])
            msgs.splice(0, msgs.length);
            for (var i = 0; i < res.length; i++) {
                msgs.push({
                    message_id: res[i].message_id,
                    sender_id: res[i].sender_id,
                    send_time: res[i].send_time,
                    message_content: res[i].message_content,
                })
            }
            socket.emit('returnMsgs', msgs)
        })
    })

    //接收消息
    socket.on('sendMessage', (data)=>{
        db.insertData('private_chat_message', data, (e, r) => {
            console.log('消息发送成功')
            console.log(data, r)
            data.message_id = r.insertId
            socket.emit('receiveMessage', [data])
            if(io.sockets.connected[onlineUsers.get(data.receiver_id)]){
                io.sockets.connected[onlineUsers.get(data.receiver_id)].emit(
                    'receiveMessage', 
                    [data])
            }
        })
    })

    // 初始化，用于和用户本地数据库做初始同步
    socket.on('initContacts', (user_id)=>{
        let friends = [];
        // db.selectAll("select * from contacts where user_id ='" + user_id + "' ", (e, res) => {
        //     friends.splice(0, friends.length);
        //     console.log(res[0])
        //     for (var i = 0; i < res.length; i++) {
        //         friends.push({
        //             friend_id: res[i].friend_id,
        //             avatar: null,
        //             remark: res[i].remark,
        //             chat_id: res[i].chat_id,
        //         })
        //     }
        //     socket.emit('initContactsReturn', friends)
        // })
        db.selectAll("call query_contacts('" + user_id + "') ", (e, res) => {
            // console.log(res);
            // console.log(r[0])
            friends.splice(0, friends.length);
            for (var i = 0; i < res[0].length; i++) {
                friends.push({
                    friend_id: res[0][i].friend_id,
                    avatar: null,
                    remark: res[0][i].remark,
                    chat_id: res[0][i].chat_id,
                })
            }
            socket.emit('initContactsReturn', friends)
        })
    })

    socket.on('initPCI', (user_id)=>{
        let PCI = [];
        db.selectAll("select * from private_chat_info where user_id ='" + user_id + "' ", (e, res) => {
            // console.log(res);
            // console.log(r[0])
            // console.log(res[0])
            PCI.splice(0, PCI.length);
            for (var i = 0; i < res.length; i++) {
                PCI.push({
                    chat_with_id: res[i].chat_with_id,
                    chat_id: res[i].chat_id,
                    do_not_disturb: res[i].do_not_disturb,
                })
            }
            socket.emit('initPCIReturn', PCI)
        })
    })

    socket.on('initPCM', (chat_id)=>{
        let PCM = [];
        db.selectAll("select * from private_chat_message where chat_id ='" + chat_id + "' ", (e, res) => {
            PCM.splice(0, PCM.length);
            
            for (var i = 0; i < res.length; i++) {
                PCM.push({
                    message_id: res[i].message_id,
                    chat_id: res[i].chat_id,
                    sender_id: res[i].sender_id,
                    receiver_id: res[i].receiver_id,
                    send_time: res[i].send_time,
                    message_content: res[i].message_content,
                })
            }
            console.log(PCM)
            socket.emit('initPCMReturn', PCM)
        })
    })

    // 用户登录时申请消息同步
    socket.on('msgSynchronize', (chat_id, last_msg_id) =>{
        let msgs = [];
        db.selectAll("select * from private_chat_message where chat_id ='" + chat_id + "' ", (e, res) => {
            // console.log(res);
            // console.log(r[0])
            msgs.splice(0, msgs.length);
            for (var i = res.length-1; i >= 0; i--) {
                if(res[i].message_id > last_msg_id){
                    msgs.push(res[i])
                }
                else{
                    break;
                }
            }
            console.log("msgSyn", msgs)
            msgs.reverse();
            console.log("msgSyn", msgs)
            socket.emit('receiveMessage', msgs)
        })
    })

    //修改昵称
    socket.on('changeNickname', (user_id, new_nickname)=> {
        // 连接数据库验证
        db.updateData('user', {nickname: new_nickname}, {id: user_id}, (e, r) => {
            console.log('昵称修改成功')
        })
    })
    
    // 查询个人信息
    socket.on('updatePersonalInfo', (user_id) =>{
        db.selectAll("select nickname from user where id ='" + user_id + "' ", (e, res) => {
            socket.emit('updatePersonalInfoReturn', {
                nickname: res[0].nickname, 
            })
        })
    })

    // 添加好友
    socket.on('addFriend', (data)=> {
        // 连接数据库验证
        console.log('add')
        let msg = '', resultData = '';
        db.selectAll("select * from user where id ='" + data.friend_id + "' ", (e, r) => {
            let tt = r.length;
            if (tt == 0) {
                msg = "用户不存在";
                socket.emit('addFriendFail');
            } else {
                resultData = r[0].id;
                db.insertData('private_chat', {user1_id: data.user_id, user2_id: data.friend_id}, (e, r) => {
                    console.log('添加成功')
                    let contact = {}, pci = {};
                    // 新的通讯录信息
                    db.selectAll("select * from contacts where user_id ='" + data.user_id + "' and " + 
                                                            "friend_id ='" + data.friend_id + "' ", (e, res) => {
                        contact = res[0];
                        // 新的聊天信息
                        db.selectAll("select * from private_chat_info where user_id ='" + data.user_id + "' and " + 
                                                                        "chat_with_id ='" + data.friend_id + "' " , (e, res) => {
                                pci = res[0];
                                console.log(contact, pci);
                                socket.emit('addFriendSuccess', contact, pci)
                        })
                    })
                })
            }
        })
    })


    socket.on('disconnect', function() {
        console.log('A client disconnected: ', socket.id);
    });

    
});

http.listen(3000, function() {
    console.log('Server is running on port 3000');
});
