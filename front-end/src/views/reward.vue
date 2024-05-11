<template>
    <div class="rewards-list">
      <van-cell-group>
        <van-cell title="签到奖励" />
        <van-cell title="报名问卷奖励" />
      </van-cell-group>
  
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell
          v-for="(item, index) in rewards"
          :key="index"
          :title="item.name"
          :label="item.content"
          :value="item.status"
          :tag="`序列号: ${index + 1}`"
        />
      </van-list>
    </div>
  </template>
  
  <script>
  import { Cell, CellGroup, List } from 'vant';
  import axios from 'axios';
  
  export default {
    components: { Cell, CellGroup, List },
    data() {
      return {
        rewards: [], // 存储从后台获取的奖励数据
        loading: false, // 控制加载状态
        finished: false, // 控制是否加载完成
        page: 1, // 当前页码
      };
    },
    methods: {
      async fetchRewards() {
        try {
          // 这里替换为你的后台API地址
          const response = await axios.get(`/api/rewards?page=${this.page}`);
          this.rewards = this.rewards.concat(response.data.results);
          this.loading = false; // 数据加载完成后，将loading设置为false
          if (response.data.results.length) {
            this.page++; // 如果还有数据，页码加1
          } else {
            this.finished = true; // 如果没有数据，表示加载完成
          }
        } catch (error) {
          console.error('Failed to fetch rewards:', error);
          this.loading = false;
        }
      },
      onLoad() {
        // 触发加载更多数据
        this.loading = true;
        this.fetchRewards();
      },
    },
    created() {
      // 页面创建时，获取第一页数据
      this.fetchRewards();
    },
  };
  </script>
  
  <style scoped>
  .rewards-list {
    padding: 10px;
  }
  </style>