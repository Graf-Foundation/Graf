<template>
  <div>
    <sui-modal v-model='open'>
      <sui-modal-header>Welcome to Graf!</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-header>Quick Start Guide</sui-header>
        <div v-html="helpContent"></div>
      </sui-modal-content>
    </sui-modal>
  </div>
</template>

<script>

export default {
  name: "Help",
  data () {
    return {
      open: false,
      helpContent: "<p>Something went wrong</p>"
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  },
  created: function () {
    this.$root.$on('openHelp', () => {
      this.toggle();
    });
    this.$http.get('static/html/Help.html').then(function(response){
      this.helpContent = response.data;
    });
  }
}

</script>
