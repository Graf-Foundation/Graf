<template>
  <div id="experiemntal">
    <sui-menu style="width: max-content;">
      <!-- <a
        v-for="tool in tools"
        is="sui-menu-item"
        v-bind:key="tool"
        @click="onToolChange(tool)"
        :active="activeTool==tool"
        icon
      >
				<sui-icon v-bind:name="icons[tool]"/>
        <br>{{altTexts[tool]}}
			</a> -->
      <a 
        is="sui-menu-item"
        v-bind:key='"Select"'
        @click='onToolChange("Select")'
        :active='activeTool=="Select"'
        >
        <i class = 'mouse pointer icon'></i>
        <br>(S)elect
      </a>
      <a 
        is="sui-menu-item"
        v-bind:key='"Node"'
        @click='onToolChange("Node")'
        :active='activeTool=="Node"'
        >
        <i class = 'circle icon'></i>
        <br>(N)ode
      </a>
      <a 
        is="sui-menu-item"
        v-bind:key='"Edge"'
        @click='onToolChange("Edge")'
        :active='activeTool=="Edge"'
         class = "ui simple dropdown item">
        <i class = 'window minimize icon'></i>
        <br>(E)dge
        <div class="menu">  
          
          <a 
          @click='onEdgeTypeChange("Undirected")'
          class="item"
          >
          Undirected
          </a>


          <a 
          @click='onEdgeTypeChange("Directed")'
          class="item"
          >
          Directed
          </a>
          
        </div>
      </a>
      <a 
        is="sui-menu-item"
        v-bind:key='"Label"'
        @click='onToolChange("Label")'
        :active='activeTool=="Label"'
        >
        <i class = 'pencil icon'></i>
        <br>(L)abel
      </a>
      <a 
      is="sui-menu-item"
        v-bind:key='"Erase"'
        @click='onToolChange("Erase")'
        :active='activeTool=="Erase"'
        >
        <i class = 'eraser icon'></i>
        <br>E(r)ase
      </a>
      <a
        v-bind:key='"Algorithm"'
        @click='onToolChange("Algorithm")'
        :active='activeTool=="Algorithm"'
        class = "ui simple dropdown item">
        <i class = 'code branch icon'></i>
        <br>(A)lgorithm
        <div class="menu">
          <a  
          @click="onAlgorithmChange('bfs')"
          class="item"
          >BFS search
          </a>

          <a class="item">DFS search</a>
          
          <a 
          @click="onAlgorithmChange('djikstra')"
          class="item"
          >
          Djikstra
          </a>
          
          <a class="item">Kosaraju</a>
        </div>
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
    },
    onAlgorithmChange(alg){
      console.log(alg);
      //SOMEONE MAKE THIS DO WHAT IT IS SUPPOSE TO DO 
    },
    onEdgeTypeChange(edgeType){
      console.log(edgeType);
      //This should do something too
    }
  }
}
</script>

<style scoped>

</style>
