<!-- 活动主页面 -->

<template>
    <div class="activity-page">
        <!-- 显示用户账户数据和市场数据 -->
        <div class="info">
        <van-cell-group inset>
            <van-cell title="curCoupons" v-model="curCoupons" />
            <van-cell title="curPoints" v-model="curPoints" />
            <van-cell title="curCouponPrice" v-model="curCouponPrice" />
        </van-cell-group>
        </div>
        
        <!-- 买卖操作 -->
        <div class="coupon-transaction">
        <van-button type="primary" @click="showBuyDialogFlag = true">Buy</van-button>
            <van-dialog 
                v-model="showBuyDialogFlag" 
                title="Sell" 
                show-cancel-button 
                @confirm="transactionBuy"
                @close="buyDialogInputValue=1"
            >
                <van-field v-model="buyDialogInputValue" type="digit" label="买入数量" />
            </van-dialog>
        
        <van-button type="primary" @click="showSellDialogFlag = true">Sell</van-button>
            <van-dialog 
                v-model="showSellDialogFlag" 
                title="Sell" 
                show-cancel-button 
                @confirm="transactionSell"
                @close="sellDialogInputValue=1"
            >
                <van-field v-model="sellDialogInputValue" type="digit" label="卖出数量" />
            </van-dialog>
        </div>

        <!-- 活动规则 -->
        <div class="rules">
        <van-cell-group inset>
            <van-cell title="活动规则 " value="点击查看活动规则" />
        </van-cell-group>
        </div>
        
        <div class="otherpages">
        <van-grid>
            <van-grid-item icon="photo-o" text="参加奖励" />
            <van-grid-item icon="photo-o" text="每日电量" />
            <van-grid-item icon="photo-o" text="每日券价" />
            <van-grid-item icon="photo-o" text="交易记录" />
        </van-grid>
        </div>
    </div>
</template>
  
<script>
import { getToken } from '@/utils/shared';

export default {
    data() {
        return {
            // ========初始化数据=====

            // 用户账户数据
            curCoupons: 0,
            curPoints: 0,

            // 市场数据
            curCouponPrice: 0,

            // 用户操作数据
            buyDialogInputValue: "1",
            sellDialogInputValue: "1",

            // ========界面控制=====

            // 买卖dialog
            showBuyDialogFlag: false,
            showSellDialogFlag: false,
            


            // =======


        };
    },
    methods: {



        async transactionBuy(action, done) {
            
            var number = buyDialogInputValue;

            const token = getToken();
            try {
                const response = await this.$http.post('/api/transactionBuy', { token: token, number: number });
                var data = response.data;
                this.updateInfo();
            } catch (error) {
                console.error('Error transactionBuy:', error);
                this.updateInfo();
            }
        },

        async transactionSell() {
            var number = sellDialogInputValue;
            const token = getToken();
            try {
                const response = await this.$http.post('/api/transactionSell', { token: token, number: number });
                var data = response.data;
                this.updateInfo();
            } catch (error) {
                console.error('Error transactionSell:', error);
                this.updateInfo();
            }
        },


        async getUserAccount() {
            // 1. 获取token
            const token = getToken();
            try {
                const response = await this.$http.post('/api/getUserAccount', { token: token });
                var data = response.data;
                this.curCoupons = data.curCoupons;
                this.curPoints = data.curPoints;
            } catch (error) {
                console.error('Error getUserAccount:', error);
            }
        },

        async getCurCouponPrice() {
            try {
                const response = await this.$http.post('/api/getCurCouponPrice', {});
                var data = response.data;
                this.curCouponPrice = data.curCouponPrice;
            } catch (error) {
                console.error('Error getCurCouponPrice:', error);
            }
        },

        async updateInfo() {
            this.getUserAccount();
            this.getCurCouponPrice();
        },
    },
    created() {
        // 页面创建时调用的方法
        this.updateInfo();
    }
};
</script>

<style scoped>
.activity-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.info, .coupon-transaction, .rules, .otherpages {
  width: 100%;
  margin-bottom: 20px;
  padding: 10px;
  /* border: 1px solid #ccc; */
  border-radius: 5px;
}

</style>