<template>
<div>
  <div class="node-labeler">
    <input v-if="nodelabeler" v-model="newlabel" @keyup.enter="change_node_label"/>
    <br>
    <button v-if="nodelabeler" @click="change_node_label" style="height: 30px" >
      Edit Node Label
    </button>
  </div>
  <div class="edge-labeler">
    <input v-if="edgelabeler" v-model="newlabel" @keyup.enter="change_edge_label"/>
    <br>
    <button v-if="edgelabeler" @click="change_edge_label" style="height: 30px" >
      Edit Edge Label
    </button>
  </div>
  <D3Network
    id="grafNet"
    :net-nodes="nodes"
    :net-links="links"
    :options="options"
    @node-click="enable_node_label"
    @link-click="enable_edge_label"
  />
  <button
  @click="onSaveImage();"
  >Save Image</button>
  <button
  @click="onSaveGraf();"
  >Save Graf</button>
  <div class="edge-labeler">
    <input placeholder="Load Graf" v-model="grafData" @keyup.enter="onLoadGraf()"/>
  </div>
</div>
</template>

<script>
import D3Network from 'vue-d3-network';
import grafhelpers from '../middleware/helperFunctions';
import helperAlgs from "../middleware/algorithms";

export default {
  name: 'Graf',
  components: {
    D3Network
  },
  props: ['currentTool'],
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
        nodelabeler: false,
        edgelabeler: false,
        selected: -1,
        selectedPrevious: null,
        newlabel: "",
        grafData: "",
        selectMultiple: false,
        selectedNodes: new Set(),
        pathActive: false,
        nodes: [
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 },
            { id: 5 },
            { id: 6 },
            { id: 7 },
            { id: 8 },
            { id: 9 }
        ],
        links: [
            { sid: 1, tid: 2, _color: 'black'},
            { sid: 2, tid: 8, _color: 'black'},
            { sid: 3, tid: 4, _color: 'black'},
            { sid: 4, tid: 5, _color: 'black'},
            { sid: 5, tid: 6, _color: 'black'},
            { sid: 7, tid: 8, _color: 'black'},
            { sid: 5, tid: 8, _color: 'black'},
            { sid: 3, tid: 8, _color: 'black'},
            { sid: 7, tid: 9, _color: 'black'}
        ],
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
      this.newlabel = node.name;
    },
    change_node_label() {
      this.nodelabeler = false;
      this.nodes[this.selected].name = this.newlabel;
      this.newlabel = ""
      this.selected = -1;
    },
    enable_edge_label(event,edge) {
      this.selected = edge.index;
      this.edgelabeler = true;
      this.newlabel = edge.name;
    },
    change_edge_label() {
      this.edgelabeler = false;
      this.links[this.selected].name = this.newlabel;
      this.newlabel = ""
      this.selected = -1;
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
