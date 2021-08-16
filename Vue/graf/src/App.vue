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
  components: {},
  data() { return { Toggled: false, } },
  methods: {
  }
}
</script>

<style>

#app {
  width: 100%;
  height: 100%;
  background:  #ffffff;
  overflow-x: auto;
  overflow-y: auto;
}

</style>
