<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <!-- 这是添加的一个测试示例 -->
    <div>
      <h1>Greeting from Server</h1>
      <form @submit.prevent="sendGreeting">
        <label for="name">Your name:</label>
        <input type="text" id="name" v-model="name" required>
        <button type="submit">Greet me!</button>
      </form>
      <p>{{ serverResponse }}</p>
    </div>
    <!-- 测试示例end -->

  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  },
  // 添加测试示例的数据和方法
  data() {
    return {
      name: '',
      serverResponse: '',
    };
  },
  methods: {
    async sendGreeting() {
      try {
        const response = await this.$http.post('/api/greet', { name: this.name });
        this.serverResponse = response.data.message;
      } catch (error) {
        console.error('Error sending greeting:', error);
        this.serverResponse = 'Error: Could not send greeting.';
      }
    },
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
