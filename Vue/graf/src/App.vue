<template>
  <div id="app">
    <Settings v-bind:open="Toggled"/>
    <div id="Router">
      <router-view/>
    </div>
  </div>
</template>

<script>


export default {
  name: 'App',
  components: {},
  data() { return { Toggled: false, } },
  methods: {
  }
}
</script>

<style>
* {
  margin: 10;
  padding: 10;
}
#app {
  width: 100%;
  height: 100%;
  background:  #ffffff;
  overflow-x: auto;
  overflow-y: auto;
}
</style>
