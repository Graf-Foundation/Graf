<template>
  <div id="app">
    <Graf/>
  </div>
</template>

<script>
import Graf from './components/Graf.vue'

export default {
  name: 'App',
  components: {
    Graf
  }
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
