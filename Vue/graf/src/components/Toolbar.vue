<template>
  <div class="toolbar">
    <button v-for="tool in tools"
            v-bind:key="tool"
            v-bind:class="{active: activeTool === tool}"
            v-on:click="activeTool = tool">
      {{tool}}
    </button>
  </div>
</template>

<script>
export default{
  name: 'Toolbar',
  data: 
  function() {
    return {
      activeTool: "Select",
      tools: ["Select", "Node", "Edge", "Label", "Erase"]
    }
  }
}
</script>      

<style scoped>
button {
  display: inline-block;
  margin: 5px;
  font-weight: normal;
}
.active {
  font-weight: bold;
}

</style>
