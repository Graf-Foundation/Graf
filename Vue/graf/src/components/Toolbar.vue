<template>
  <div class="toolbar">
    <button v-for="tool in tools"
            v-bind:key="tool"
            v-bind:class="{active: activeTool === tool}"
            v-on:click="activeTool = tool">
      <img v-bind:src=icons[tool] v-bind:title="altTexts[tool]"/>
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
  mounted() {
    document.addEventListener("keypress", (event) => {
      //may want to consider making a class for scalability when we begin to add more features
      switch(event.key){
        case "s":
          this.$set(this,"activeTool","Select");
          break;
        case "n":
          this.$set(this,"activeTool","Node");
          break;
        case "e": 
          this.$set(this,"activeTool","Edge");
          break;
        case "l":
          this.$set(this,"activeTool","Label");
          break;
        case "r":
          this.$set(this,"activeTool","Erase");
          break;
        default:
          break;
      }
    });
  },
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
        "Erase" : erase_logo
      },
      altTexts: {
        "Select" : "(s)elect",
        "Node" : "(n)ode",
        "Edge" : "(e)dge",
        "Label" : "(l)abel",
        "Erase" : "e(r)ase"
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
