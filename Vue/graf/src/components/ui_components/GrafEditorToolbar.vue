<template>
  <v-toolbar>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-btn  v-on:click="addNodeClick">Add Node</v-btn>
    <v-btn v-on:click="removeModeClick">Remove</v-btn>
    <v-btn v-on:click="addEdgeClick">Add Edge</v-btn>

  </v-toolbar>
</template>

<script>
export default {
  name: "GrafEditorToolbar",
  methods:  {
    addNodeClick() {
      this.$emit("add-node-tool-click");
    },
    removeModeClick() {
      this.$emit("remove-tool-click");
    },
    addEdgeClick() {
      this.$emit("add-edge-tool-click");
    }
  }
}


</script>

<style scoped>

</style>