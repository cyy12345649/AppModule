

<template>
    <div class="centered-module">
        <image class="logo" src="../assets/sgcc.jpg">
        </image>
        <p  class="fancy-text">欢迎参加错峰充电活动！</p>
         <router-link to="/pages/index/activitymain" tag="button" class="bottom-button">
             我要报名
           </router-link>
    </div>  

</template>

<script>
   export default {
       data() {
           return {
               title: '欢迎参加错峰充电活动！'
           }
       },
       onLoad() {

       },
       methods: {

       }
   }
</script>

<style>
   .bottom-button {
     position: fixed; /* 固定定位到页面底部 */
     bottom: 20px; /* 距离底部20px */
     left: 50%; /* 居中 */
     transform: translateX(-50%); /* 向左移动自身宽度的50%来居中 */
     padding: 10px 20px; /* 内边距 */
     background-color: #42b983; /* 背景颜色 */
     color: white; /* 文字颜色 */
     border: none; /* 边框 */
     border-radius: 5px; /* 边框圆角 */
     cursor: pointer; /* 鼠标悬停效果 */
     /* 可以根据需要添加更多样式 */
   .content {
       display: flex;
       flex-direction: column;
       align-items: center;
       justify-content: center;
   }
   }
.fancy-text {
 font-family: 'Courier New', Courier, monospace; /* 字体 */
 color: #333; /* 文字颜色 */
 font-weight: bold;
 /* background-color: #f0f0f0; 背景颜色 */
 /*  text-decoration: underline;下划线 */
 text-transform: uppercase; /* 全部大写 */
 letter-spacing: 2px; /* 字符间距 */
 word-spacing: 4px; /* 单词间距 */
 /*  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);文本阴影 */
 transition: all 0.3s ease; /* 过渡效果 */
}


   .logo {
       height: 200rpx;
       width: 200rpx;
       margin-top: 200rpx;
       margin-left: auto;
       margin-right: auto;
       margin-bottom: 50rpx;
       align-items: center;
   }
.centered-module {
 display: flex; /* 使用Flexbox布局 */
 justify-content: center; /* 水平居中 */
 align-items: center; /* 垂直居中 */
 height: 400px; /* 容器高度，可根据需要调整 */
 flex-direction: column; /* 垂直排列子元素 */
 text-align: center; /* 文字居中 */
}

.centered-image {
 max-width: 100%; /* 确保图片最大宽度不超过容器宽度 */
 height: auto; /* 保持图片的原始宽高比 */
 margin-bottom: 20px; /* 图片与文字间的间距 */
}
   .text-area {
       display: flex;
       justify-content: center;
   }

   .title {
       font-size: 36rpx;
       color: #8f8f94;
       
   .button {
     background-color: #4CAF50; /* Green */
     border: none;
     color: white;
     padding: 15px 32px;
     text-align: center;
     text-decoration: none;
     display: inline-block;
     font-size: 16px;
   }
   }
</style>
