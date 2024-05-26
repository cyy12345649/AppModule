<!-- 活动主页面 -->

<template>
    <div>
        <!-- 你的页面内容 -->

        <div>
            <!-- <van-button type="primary" @click="showBuyDialog">Buy</van-button>
                <van-dialog v-show="showBuyDialogFlag" title="Buy" show-cancel-button :beforeClose="beforeCloseBuyDialog">
                    <van-field v-model="buyDialogInputValue" type="digit" label="购买数量" />
                </van-dialog> -->
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
        {{ sellDialogInputValue }}

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

<style>
.full-screen {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>