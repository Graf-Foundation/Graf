<template>
  <div>
    <center>

      <header>
        <Toolbar @tool-change="change_tool"></Toolbar>
      </header>

      <div class="labeler"  v-if="currentTool=='Label'" style="margin: 1em 0em 0em" >
        <sui-input v-model="newlabel" @keyup.enter="change_label"/>
        <br>
        <sui-button
          color="green" content="Edit Label" @click="change_label"
          style="height: 30px"
        />
      </div>

      <D3Network
        id="grafNet"
        :net-nodes="nodes"
        :net-links="links"
        :options="options"
        @node-click="enable_node_label"
        @link-click="enable_edge_label"
      />

      <div class="graf-labeler  ">
        <sui-button @click="onSaveImage();" color="green" content="Save Image"/>
        <sui-button @click="onSaveGraf();" color="green" content="Save Graph"/>
        <br>
        <sui-input placeholder="Load Graf" v-model="grafData" @keyup.enter="onLoadGraf()"/>
      </div>

    </center>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import grafhelpers from '../middleware/helperFunctions';
import helperAlgs from "../middleware/algorithms";
import Toolbar from '../components/Toolbar.vue'


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
            switch(event.key) {
                case "Shift":
                    this.selectMultiple = true;
                    break;
                default:
                    break;
            }
      }.bind(this), false)

      document.addEventListener("keyup", function() {
            this.selectMultiple = false;
      }.bind(this), false)
  },
  data () {
    return {
        currentTool: "",
        nodelabeler: false,
        edgelabeler: false,
        selected: -1,
        selectedPrevious: null,
        newlabel: "",
        grafData: "",
        selectMultiple: false,
        selectedNodes: new Set(),
        pathActive: false,
        nodes: [{ id: 1 }],
        links: [],
        nodeSize:20,
        canvas:false
    };
  },
  computed:{
    options(){
        return{
            force: 3000,
            size:{ w: window.innerWidth, h: window.innerHeight - 200},
            nodeSize: this.nodeSize,
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
        grafhelpers.saveGraf(this.nodes, this.links);
    },
    onLoadGraf() {
        var data = grafhelpers.loadGraf(this.grafData);
        this.nodes = data.nodes;
        this.links = data.links;
        this.grafData = "";
    },
    // TODO: place these as individual methods in a js file and import them
    // TODO: erase tool
    useTool(tool) {
        console.log(tool, this.selectMultiple);
        switch(tool){
            case "Select":
                if(this.selectMultiple) {
                    this.selectedNodes.add(this.selected);
                } else {
                    this.selectedNodes = new Set();
                }
                break;
            case "Node":
                this.nodes.push({id:this.nodes.length + 1});
                break;

            case "Edge":
                if(this.selectedPrevious == null) {
                    this.selectedPrevious = this.selected + 1

                } else if(this.selectedPrevious != this.selected + 1) {
                    this.links.push({sid: this.selectedPrevious, tid: this.selected + 1, _color: 'black'});
                    this.selectedPrevious = null;
                }
                break;

            case "Algorithm":

                // If there is no red path on screen
                if(!this.pathActive) {

                    // Get start and end nodes
                    var goals = Array.from(this.selectedNodes);

                    // Find bfs path
                    var path = helperAlgs.bfs(goals[0] + 1, goals[1] + 1, this.links);

                    // Recolor all edges in path
                    for (var i in path) {
                        for (var j in this.links) {
                            if ((path[i][0] == this.links[j].sid && path[i][1] == this.links[j].tid) || (path[i][1] == this.links[j].sid && path[i][0] == this.links[j].tid)) {
                                this.links[j]._color = 'red';
                                break;
                            }
                        }
                    }
                    this.selectedNodes = new Set();
                    this.pathActive = true;

                // Remove coloring and deactivate path
                } else {
                    for (j in this.links) {
                        this.links[j]._color = 'black';
                    }
                    this.pathActive = false;
                }
                break;
            default:
                break;
        }
    },
    enable_node_label(event,node) {
      this.selected = node.index;
      this.nodelabeler = true;
      this.edgelabeler = false;
      this.newlabel = node.name;
    },
    enable_edge_label(event,edge) {
      this.selected = edge.index;
      this.edgelabeler = true;
      this.nodelabeler = false;
      this.newlabel = edge.name;
    },
    change_label() {
      if(this.edgelabeler) {
        this.edgelabeler = false;
        this.links[this.selected].name = this.newlabel;
        this.newlabel = "";
        this.selected = -1;
      }
      if(this.nodelabeler) {
        this.nodelabeler = false;
        this.nodes[this.selected].name = this.newlabel;
        this.newlabel = "";
        this.selected = -1;
      }
      var t = this.nodes[0].name;
      this.nodes[0].name = "TEMP";
      this.nodes[0].name = t;
    },
    change_tool (tool) {
        this.currentTool = tool;
    }
  }
}
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: fixed;
  right: 10px;
  top: 70px;
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
