<template>
    <div class="activity-container">
      <div class="activity-header">
        <h1>错峰充电活动</h1>
        <p>签到</p>
      </div>
      <div class="activity-details">
        <h2>错峰充电，智慧生活</h2>
        <p>活动时间：<span>x月x日至x月x日</span></p>
        <p>距离报名结束：<span>x月x日x分x秒</span></p>
        <p>剩余名额：<span>x位</span></p>
      </div>
      <button class="register-button" @click="registerition">立即报名</button>
      <a href="javascript:void(0);" class="rules-link">点击查看活动规则</a>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      register() {
        // 这里可以添加报名的逻辑
        alert('报名成功！');
      }
    }
  }
  </script>
  
  <style scoped>
  .activity-container {
    text-align: center;
    padding: 20px;
  }
  
  .activity-header h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
  
  .activity-details {
    margin-bottom: 20px;
  }
  
  .activity-details h2 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  
  .activity-details p {
    margin: 5px 0;
  }
  
  .activity-details p span {
    font-weight: bold;
  }
  
  .register-button {
    padding: 10px 20px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .register-button:hover {
    background-color: #45a049;
  }
  
  .rules-link {
    color: #337ab7;
    text-decoration: none;
  }
  
  .rules-link:hover {
    text-decoration: underline;
  }
  </style>