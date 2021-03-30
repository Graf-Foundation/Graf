<template>
  <div>
    <sui-dropdown class="right floated icon" icon="settings" button pointing="top left">
      <sui-dropdown-menu>
        <sui-dropdown-item>
          <router-link to="/about">About</router-link>
          </sui-dropdown-item>

        <sui-dropdown-item>Settings</sui-dropdown-item>
        <sui-dropdown-item>FAQ</sui-dropdown-item>
      </sui-dropdown-menu>
    </sui-dropdown>

    <!-- <div class="dropdown">
    <button class="dropbtn"><img width = "20" src = "../assets/gear.png" /></button>
      <div class="dropdown-content">
        <router-link to="/about">About</router-link>
        <a href="#">FAQ</a>
        <a href="#">Other</a>
      </div>
		</div> -->
    
    <div>
        <button @click="onAlgorithmChange('bfs');">BFS search</button>
        <button @click="onAlgorithmChange('djikstra');">Djikstra</button>
    </div>
    <center>

      <header>
        <Toolbar @tool-change="change_tool" @alg-change="onAlgorithmChange"></Toolbar>
      </header>

      <div class="labeler"  v-if="currentTool=='Label'" style="margin: 1em 0em 0em" >
        <sui-input v-model="selection.selectedCurrent.name" @keypress.stop />
        <br>
        Change Label
      </div>

      <D3Network
        id="grafNet"
        :net-nodes="graf.nodes"
        :net-links="graf.links"
        :options="options"
        @node-click="handle_node_click"
        @link-click="handle_edge_click"
      />

      <div class="graf-labeler">
        <sui-button @click="onSaveImage();" color="green" content="Save Image"/>
        <sui-button @click="onSaveGraf();" color="green" content="Save Graph"/>
        <sui-button @click="onResetGraf();" color="green" content="Reset Graph"/>
        <br>
        <sui-input placeholder="Load Graf" v-model="grafData" @keyup.enter="onLoadGraf()"/>
      </div>

    </center>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import grafhelpers from '../middleware/helperFunctions';
import Toolbar from '../components/Toolbar.vue'
import GrafTools from '../middleware/graf_tools.js'
//import About from 'About.vue'


export default {
  name: 'Graf',
  components: {
    D3Network,
    Toolbar
  },
  mounted () {
      document.getElementById("grafNet").addEventListener("click", function() {
            this.useTool(this.currentTool);
      }.bind(this), false);
      document.addEventListener("keydown", function(event) {
            switch(event.code) {
                case "Escape":
                    GrafTools.update_distances(this.graf, null, false);
                    GrafTools.clear_selection(this.graf, this.selection)
                    this.selection.selectMultiple = false;
                    break;
                default:
                    break;
            }
      }.bind(this), false)
			document.addEventListener("keyup", function() {
			this.selection.selectMultiple = false;
      }.bind(this), false)
  },
  data () {
    return {
        currentTool: "",
        nodelabeler: false,
        edgelabeler: false,
        grafData: "",
        selection: {
          selectedAlgorithm: null,
          selectedCurrent: null, //
          selectedLast: null, //
          selectMultiple: true,
          selectedNodes: new Set(),
          selectedEdges: new Set()
        },
        graf: {
          nodes: [{ id: 0 }],
          links: [],
          nodeSize:20,
          aggCount: 1,
          canvas:false,
          pathActive: false
        }
    };
  },

  computed:{
    options(){
        return{
            force: 3000,
            size:{ w: window.innerWidth, h: window.innerHeight - 200},
            nodeSize: this.graf.nodeSize,
            nodeLabels: true,
            linkLabels:true,
            canvas: this.canvas,
            linkWidth: 3,
            fontSize: 20
        }
    }
  },
  methods: {
    onSaveImage() {
        grafhelpers.screenshotGraf(document.getElementsByClassName("net-svg")[0]);
    },
    onSaveGraf() {
        grafhelpers.saveGraf(this.graf);
    },
    onLoadGraf() {
        var data = grafhelpers.loadGraf(this.grafData);
        this.graf = data;
        this.grafData = "";
    },
    onResetGraf() {
        this.graf.nodes = [{ id: 0 }];
        this.graf.links = [];
        this.grafData = "";
    },
    onAlgorithmChange(alg) {
        console.log("ñññññ");
        console.log(alg);
        this.selection.selectedAlgorithm = alg;
    },
    // TODO: place these as individual methods in a js file and import them
    // TODO: erase tool
    useTool(tool) {
        switch(tool){
          case "Select":
            this.pathActive
            this.selection.selectMultiple = true;
            break;
          case "Node":
            this.selection.selectMultiple = false;
            GrafTools.new_node(this.graf);
            this.graf.aggCount += 1;
            break;
          case "Edge":
            this.selection.selectMultiple = false;
            GrafTools.new_edge(this.graf, this.selection);
            break;
          case "Algorithm":
            this.selection.selectMultiple = false;
            GrafTools.algorithm(this.graf, this.selection);
            break;
          case "Erase":
            this.selection.selectMultiple = false;
            GrafTools.erase(this.graf, this.selection);
            GrafTools.clear_selection(this.graf, this.selection)
            break;
          default:
            break;
        }
    },
    handle_node_click(event,node) {
        this.selection.selectedLast = this.selection.selectedCurrent;
        this.selection.selectedCurrent = node;
        if(this.currentTool == 'Select')
            GrafTools.update_selection(this.graf, node, 'node', this.selection);
    },
    handle_edge_click(event,edge) {
        if(this.currentTool == 'Select')
            GrafTools.update_selection(this.graf, edge, 'edge', this.selection);
    },
    change_tool (tool) {
        //GrafTools.clear_selection(this.graf, this.selection)
        this.currentTool = tool;
        this.useTool(tool);
    },

  }
}

</script>

<style scoped>
/* Dropdown Button */
.dropbtn {
  background-color: white;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  position: fixed;
  right: 10px;
  top: 10px;
  /*right: 100px;*/
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: fixed;
  right: 10px;
  top: 63px;
  background-color: #f1f1f1;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #ddd;}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {display: block;}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {background-color: #41bb22c0;}

</style>
