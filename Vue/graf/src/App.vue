<template>
  <div id="app">
    <div id="Router">
      <router-view/>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
}
</script>

<style>
* {
  margin: 10;
  padding: 10;
}
#app {
  overflow-x: auto;
  width: 100%;
  height: 100%;
  background:  #ffffff;
}
</style>
