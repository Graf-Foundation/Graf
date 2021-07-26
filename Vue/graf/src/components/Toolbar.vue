<template>
  <div>
    <sui-menu style="width: max-content;">
      <sui-menu-item
        v-for="tool in tools"
        v-bind:key="tool"
        @click="onToolChange(tool)"
        :active="activeTool==tool"
      >
        <sui-icon v-bind:name="icons[tool]"/>
        <br>{{altTexts[tool]}}

        <sui-dropdown v-if="subMenus[tool]">
          <sui-dropdown-menu>
            <sui-dropdown-item
              v-for="(key,val) in subMenus[tool]"
              v-bind:key="key"
              @click="subMenuHandler(val, tool)"
              :active="subMenuActive[tool]==val"
            >
            {{key}}
            </sui-dropdown-item>
          </sui-dropdown-menu>
        </sui-dropdown>

      </sui-menu-item>
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
          this.onToolChange("Select");
          break;
        case "n":
          this.onToolChange("Node");
          break;
        case "e":
          this.onToolChange("Edge");
          break;
        case "l":
          this.onToolChange("Label");
          break;
        case "r":
          this.onToolChange("Erase");
          break;
        case "a":
          this.onToolChange("Algorithm");
          break;
        case "c":
          this.onToolChange("Contract");
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
      activeAlg: "bfs",
      tools: [
        "Select",
        "Node",
        "Edge",
        "Label",
        "Erase",
        "Algorithm",
        "Contract"
      ],
      icons: {
        "Select" : 'mouse pointer',
        "Node" : 'circle',
        "Edge" : 'window minimize',
        "Label" : 'pencil',
        "Erase" : 'eraser',
        "Algorithm" : 'code branch',
        "Contract" : 'adjust'
      },
      altTexts: {
        "Select" : "(S)elect",
        "Node" : "(N)ode",
        "Edge" : "(E)dge",
        "Label" : "(L)abel",
        "Erase" : "E(r)ase",
        "Algorithm" : "(A)lgorithm",
        "Contract" : "(C)ontract"
      },
      subMenus: {
        "Edge" : {
          "undir" : "Undirected",
          "dir" : "Directed",
          "bidir" : "Bidirected"
        },
        "Algorithm" : {
          "bfs" : "Breadth First Search (BFS)",
          "dijkstra" : "Dijkstra",
          "dfs" : "Depth First Search (DFS)"
        }
      },
      subMenuActive: {
        "Edge" : "undir",
        "Algorithm" : "bfs"
      }
    }
  },
  methods: {
    onToolChange (tool) {
      this.activeTool = tool;
      this.$emit('tool-change', tool);
    },
    onAlgorithmChange(alg){
      this.$emit('alg-change', alg);
    },
    onEdgeTypeChange(edgeType){
      this.$emit('edge-change', edgeType);
    },
    subMenuHandler(menuItem, tool) {
      if(tool == "Algorithm") this.onAlgorithmChange(menuItem);
      if(tool == "Edge") this.onEdgeTypeChange(menuItem);
      this.subMenuActive[tool] = menuItem;
      this.onToolChange(tool);
    }
  }
}
</script>

<style scoped>

</style>
