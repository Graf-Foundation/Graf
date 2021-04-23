<template>
  <div id="app" v-on:mousemove="sideBarCheck">
    <Settings v-bind:open="Toggled"/>
    <div id="Router">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Settings from './components/Settings.vue';

export default {
  name: 'App',
  components: { Settings },
  data() { return { Toggled: false, } },
  methods: {
    sideBarCheck: function(event) {
      var x = event.clientX;
      var y = event.clientY;
      if(x < 200 && y < 50) {
        this.Toggled = true;
      } else if (x < 200 && this.Toggled) {
        this.Toggled = true;
      } else {
        this.Toggled = false;
      }
    }
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
