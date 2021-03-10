<template>
  <div id="app">
    <header>
      <Toolbar></Toolbar>
    </header>
    <Graf/>
  </div>
</template>

<script>
import Graf from './components/Graf.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  components: {
    Graf,
    Toolbar
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
