<template>
    <div class="energy-usage">
      <h1>用电统计</h1>
      <p>日期：2024年3月20日 - 2024年3月26日</p>
      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">日均用电量：</span>
          <span class="stat-value">3度</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">总用电量：</span>
          <span class="stat-value">XXX度</span> <!-- 假设这里的数据需要动态获取 -->
        </div>
        <div class="stat-item">
          <span class="stat-label">用户平均用电水平：</span>
          <span class="stat-value">XXX度</span> <!-- 同上 -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'EnergyUsage',
    data() {
      return {
        // 假设这里是从API获取的用电量数据
        totalEnergyUsage: 'XXX度', // 总用电量
        userAverageLevel: 'XXX度', // 用户平均用电水平
      };
    },
    mounted() {
      // 假设组件挂载后，我们需要从API获取数据
      this.fetchEnergyUsageData();
    },
    methods: {
      fetchEnergyUsageData() {
        // 这里应该是API请求的代码，为了示例，我们直接设置数据
        this.totalEnergyUsage = '1234度';
        this.userAverageLevel = '1000度';
      }
    }
  };
  </script>
  
  <style scoped>
  .energy-usage {
    text-align: center;
    padding: 20px;
  }
  
  .stat-item {
    margin: 10px 0;
  }
  
  .stat-label {
    font-weight: bold;
  }
  
  .stat-value {
    margin-left: 10px;
    font-size: 1.2em;
    color: #333;
  }
  </style>