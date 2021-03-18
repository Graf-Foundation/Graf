<template>
  <div id="app">
    <div id="Router">
      <router-view/>
    </div>
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
* {
  margin: 10;
  padding: 10;
}
#app {
  overflow-x: scroll;
  width: 100%;
  height: 100%;
  background:  #ffffff;
}
</style>
