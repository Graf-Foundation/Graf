<template>
  <div>
    <sui-button @click='toggle' class="right floated icon" icon="help" pointing="bottom left"></sui-button>
    <sui-modal v-model='open'>
      <sui-modal-header>Welcome to Graf!</sui-modal-header>
      <sui-modal-content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur consectetur dui leo, in auctor leo molestie at. Quisque eu magna nec felis interdum pretium et vel arcu. Aenean sit amet est volutpat, tristique elit quis, imperdiet urna. Morbi eget hendrerit diam, eu sollicitudin tellus. Suspendisse ipsum dolor, posuere vel faucibus ut, vestibulum vel dolor. Curabitur a faucibus arcu. Proin tincidunt metus dapibus scelerisque posuere. Curabitur non bibendum arcu, in luctus ligula. Phasellus consectetur interdum nibh eget aliquam. Nullam a lacus commodo elit facilisis pellentesque.
        </p>
      </sui-modal-content>
      <sui-modal-actions>
        <sui-button positive @click='toggle'>
          OK
        </sui-button>
      </sui-modal-actions>
    </sui-modal>
  </div>
</template>

<script>

export default {
  name: "Help",
  data () {
    return {
      open: false
    }
  },
  methods: {
    toggle() {
      this.open = !this.open
    }
  }
}

</script>
