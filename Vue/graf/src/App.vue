<template>
  <div id="app">
    <header>
      <Toolbar @example="methodName"></Toolbar>
    </header>
    <Graf v-bind:currentTool="currentTool" />
  </div>
</template>

<script>
import Graf from './components/Graf.vue'
import Toolbar from './components/Toolbar.vue'

export default {
  name: 'App',
  data () {
      return {
          currentTool: "Select"
      }
  },
  components: {
    Graf,
    Toolbar
  },
  methods: {
      methodName (tool) {
          this.currentTool = tool;
      }
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
