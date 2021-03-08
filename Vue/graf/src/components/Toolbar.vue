<template>
  <div class="toolbar">
    <button v-for="tool in tools"
            v-bind:key="tool"
            v-bind:class="{active: activeTool === tool}"
            v-on:click="activeTool = tool">
      <img v-bind:src=icons[tool] />
    </button>
  </div>
</template>

<script>
import select_logo from '../assets/select.svg';
import node_logo from '../assets/node.svg';
import edge_logo from '../assets/edge.svg';
import label_logo from '../assets/label.svg';
import erase_logo from '../assets/erase.svg';
export default{
  name: 'Toolbar',
  data: 
  function() {
    return {
      activeTool: "Select",
      tools: ["Select", "Node", "Edge", "Label", "Erase"],
      icons: {
        "Select" : select_logo,
        "Node" : node_logo,
        "Edge" : edge_logo,
        "Label" : label_logo,
        "Erase" : erase_logo,
      }
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
  background-color: LightGray;
}
.toolbar {
  display: inline-block;
  border: solid;
}
img {
  width: 20px;
  height: 20px;
  float: left;
}

</style>
