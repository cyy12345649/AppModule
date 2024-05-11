<template>
    <div class="activity-signup">
      <van-popup v-model="showPopup" round position="bottom" closeable>
        <van-form @submit="onSignup">
          <van-cell-group>
            <van-field
              v-for="condition in conditions"
              :key="condition.id"
              :label="condition.label"
              :value="condition.status ? '符合' : '不符合'"
              readonly
              input-align="right"
            />
          </van-cell-group>
          <van-checkbox v-model="agreed">我已阅读并同意报名说明</van-checkbox>
          <div class="btns">
            <van-button round block type="info" native-type="submit">我要报名</van-button>
          </div>
        </van-form>
      </van-popup>
  
      <van-dialog
        v-model="showSuccessDialog"
        title="报名成功"
        show-cancel-button
        confirm-button-text="确定"
        @confirm="goBack"
      />
  
      <van-dialog
        v-model="showFailDialog"
        title="报名失败"
        show-cancel-button
        confirm-button-text="确定"
        @close="goBack"
      />
    </div>
  </template>
  
  <script>
  import { Dialog, Form, Field, CellGroup, Checkbox, Button, Popup } from 'vant';
  import axios from 'axios';
  
  export default {
    components: { Dialog, Form, Field, CellGroup, Checkbox, Button, Popup },
    data() {
      return {
        conditions: [], // 报名条件
        showPopup: true, // 是否显示报名表单弹窗
        showSuccessDialog: false, // 是否显示报名成功弹窗
        showFailDialog: false, // 是否显示报名失败弹窗
        agreed: false, // 用户是否同意报名说明
      };
    },
    methods: {
      async checkEligibility() {
        try {
          const response = await axios.get('/api/eligibility');
          this.conditions = response.data; // 假设返回的数据是条件列表
        } catch (error) {
          console.error('Failed to check eligibility:', error);
          this.showFailDialog = true;
        }
      },
      onSignup(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        if (!this.agreed) {
          this.$toast('请阅读并同意报名说明');
          return;
        }
  
        // 检查是否所有条件都符合
        const isEligible = this.conditions.every(condition => condition.status);
        if (isEligible) {
          this.signup();
        } else {
          this.showFailDialog = true;
        }
      },
      async signup() {
        try {
          const response = await axios.post('/api/signup');
          if (response.data.success) {
            this.showSuccessDialog = true;
          } else {
            this.$toast.fail('报名失败，请稍后再试！');
          }
        } catch (error) {
          console.error('Failed to signup:', error);
          this.$toast.fail('报名失败，请稍后再试！');
        }
      },
      goBack() {
        // 关闭弹窗并返回上一页
        this.showSuccessDialog = false;
        this.showFailDialog = false;
        this.$router.go(-1); // 使用Vue Router的$router对象返回上一页
      },
    },
    created() {
      this.checkEligibility();
    },
  };
  </script>
  
  <style scoped>
  .activity-signup {
    padding: 16px;
  }
  .btns {
    margin-top: 16px;
  }
  </style>