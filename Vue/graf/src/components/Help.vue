<template>
  <div>
    <!-- <sui-button @click='toggle' class="right floated icon" icon="help"></sui-button> -->
    <sui-modal v-model='open'>
      <sui-modal-header>Welcome to Graf!</sui-modal-header>
      <sui-modal-content scrolling>
        <sui-header>Quick Start Guide</sui-header>
        <div v-html="helpContent"></div>
      </sui-modal-content>
      <sui-modal-actions>
        <router-link to="/" tag = "sui-button">
          OK
        </router-link>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>

export default {
  name: "Help",
  data () {
    return {
      open: true,
      helpContent: "<p>Something went wrong</p>"
    }
  },
  // methods: {
  //   toggle() {
  //     this.open = !this.open
  //   }
  // },
  created: function () {
    this.$http.get('static/html/Help.html').then(function(response){
      this.helpContent = response.data;
    });
  }
}

</script>
