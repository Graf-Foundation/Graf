<template>
  <v-app name="App">
    <v-main name="Main">
      <router-view/>
    </v-main>
  </v-app>
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
