<template>
  <div id="experiemntal">
    <sui-menu style="width: max-content;">
      <a
        v-for="tool in tools"
        is="sui-menu-item"
        v-bind:key="tool"
        @click="onToolChange(tool)"
        :active="activeTool==tool"
        icon
      >
				<sui-icon v-bind:name="icons[tool]"/>
        <br>{{altTexts[tool]}}
			</a>
    </sui-menu>
</div>
</template>

<script>
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
        case "a":
          this.$set(this,"activeTool","Algorithm");
          break;
        case "v":
          this.changeVertical();
          break;
        default:
          break;
      }
    });
  },
  data:
  function() {
    return {
      isVertical: false,
      activeTool: "Select",
      tools: ["Select", "Node", "Edge", "Label", "Erase", "Algorithm"],
      icons: {
        "Select" : 'mouse pointer',
        "Node" : 'circle',
        "Edge" : 'window minimize',
        "Label" : 'pencil',
        "Erase" : 'eraser',
        "Algorithm" : 'code branch'
      },
      altTexts: {
        "Select" : "(S)elect",
        "Node" : "(N)ode",
        "Edge" : "(E)dge",
        "Label" : "(L)abel",
        "Erase" : "E(r)ase",
        "Algorithm": "(A)lgorithm"
      }
    }
  },
  methods: {
    onToolChange (tool) {
      this.activeTool = tool;
      this.$emit('tool-change', tool);
    }
  }
}
</script>

<style scoped>

</style>
