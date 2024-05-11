<template>
    <div class="signin-page">
      <van-nav-bar title="签到" left-text="返回" left-arrow @click-left="goBack" />
  
      <van-button type="primary" block @click="signIn">签到</van-button>
  
      <div class="signin-info">
        <van-cell title="连续签到天数" :value="signinDays" />
      </div>
  
      <div v-if="rewardAvailable" class="reward-info">
        <van-button type="danger" block @click="claimReward">领取现金红包</van-button>
        <van-cell title="已连续签到7天" value="您有资格领取现金红包" />
      </div>
    </div>
  </template>
  
  <script>
  import { NavBar, Button, Cell } from 'vant';
  import axios from 'axios';
  
  export default {
    components: { NavBar, Button, Cell },
    data() {
      return {
        signinDays: 0, // 当前连续签到天数
        rewardAvailable: false, // 是否有资格领取红包
      };
    },
    methods: {
      goBack() {
        // 返回活动页面的逻辑
        this.$router.push('/activity');
      },
      async signIn() {
        try {
          const response = await axios.post('/api/signin');
          this.updateSigninData(response.data);
        } catch (error) {
          console.error('Failed to sign in:', error);
        }
      },
      async claimReward() {
        try {
          const response = await axios.post('/api/claim-reward');
          if (response.data.success) {
            this.rewardAvailable = false; // 重置奖励状态
            this.signinDays = 0; // 重置签到天数
            this.$toast.success('现金红包领取成功！');
          } else {
            this.$toast.fail('领取失败，请稍后再试！');
          }
        } catch (error) {
          console.error('Failed to claim reward:', error);
          this.$toast.fail('领取失败，请稍后再试！');
        }
      },
      updateSigninData(data) {
        // 假设后台返回的数据中包含连续签到天数和奖励状态
        this.signinDays = data.signinDays;
        this.rewardAvailable = data.rewardAvailable;
      },
    },
    created() {
      // 页面创建时，获取当前签到状态
      this.signIn();
    },
  };
  </script>
  
  <style scoped>
  .signin-page {
    padding: 16px;
  }
  .signin-info {
    margin: 16px 0;
  }
  .reward-info {
    margin-bottom: 16px;
  }
  </style>