<!-- 活动主页面 -->

<template>
    <div>
        <!-- 你的页面内容 -->

        <div>
            <van-button type="primary" @click="showBuyDialog">Buy</van-button>
                <!-- Buy dialog -->
                <van-dialog
                    v-model="showBuyDialogFlag"
                    title="Buy"
                    show-cancel-button
                    :beforeClose="transactionBuy"
                >
                    <!--输入框-->
                    <van-field v-model="buyDialogInputValue" type="digit" label="购买数量" />                    
                </van-dialog>
            <van-button type="primary" @click="showSellDialog">Sell</van-button>
                <!-- Sell dialog -->
                <van-dialog
                    v-model="showSellDialogFlag"
                    title="Sell"
                    show-cancel-button
                    :beforeClose="transactionSell"
                >
                    <!--输入框-->
                    <van-field v-model="sellDialogInputValue" type="digit" label="卖出数量" />                    
                </van-dialog>
        </div>
    </div>
</template>
  
<script>
import { getToken } from '@/utils/shared';
import { Dialog, Toast } from 'vant';

export default {
    data() {
        return {
            // 初始化数据
            curCoupons,
            curPoints,

            curCouponPrice,

            // 界面控制
            showBuyDialogFlag: false,
            showSellDialogFlag: false,

            buyDialogInputValue: "1",
            sellDialogInputValue: "1",

        };
    },
    methods: {
        // 你的组件方法
        showBuyDialog() {
            this.showBuyDialogFlag = true;            
        },

        beforeCloseBuyDialog(action, done) {
            if (action === 'cancel') {//取消按钮
                done();
            } else if (action === 'confirm') {//确定按钮
                    //向后端传值并关闭dialog弹出框
                    var value = buyDialogInputValue;
                    if (value !== null && value !== '') {
                        const number = parseInt(value, 10);
                        if (number > 0  && Number.isInteger(number)) {
                            // await this.sendRequestToBackend(number);
                            this.transactionBuy(number);
                        } else {
                            Toast.fail('输入无效，请输入xxx！');
                        }
                    }
                    // this.show = false;
                };
                this.buyDialogInputValue="1";
                done();
            }

        async transactionBuy(action, done) {
            

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

        showSellDialog() {
            var inputValue = ''; // 重置输入值
            Dialog.confirm({
                title: '输入正整数',
                message: `请输入一个小于 ${this.curCoupons} 的正整数：`,
                showInput: true, // 显示输入框
                inputPlaceholder: '输入数字',
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            })
                .then(() => {
                    // on confirm
                    if (value !== null && value !== '') {
                        const number = parseInt(value, 10);
                        if (number > 0 && number <= this.curCoupons && Number.isInteger(number)) {
                            // await this.sendRequestToBackend(number);
                            this.transactionSell(number);
                        } else {
                            Toast.fail('输入无效，请输入一个小于 ' + this.x + ' 的正整数！');
                        }
                    }
                })
                .catch(() => {
                    // on cancel
                });
        },

        async transactionSell(number) {
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