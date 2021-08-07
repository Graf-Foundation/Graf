<template>
  <div id="app" v-on:mousemove="sideBarCheck">
    <Settings v-bind:open="Toggled" @slider-change="onSliderChange" 
          @edge-change="onEdgeChange"
          @color-change="onColorChange"/>
    <center>
      <header class="fixedTC">
        <Toolbar @tool-change="change_tool" @edge-change="change_edge" @alg-change="onAlgorithmChange"></Toolbar>

        <sui-button @click="onUndo();" icon="undo" data-tooltip="Ctrl-Z" data-position="bottom center"/>
        <sui-button @click="onRedo();" icon="redo" data-tooltip="Ctrl-Y" data-position="bottom center"/>
        <sui-button @click="clear_selections()" icon ="eye slash" data-tooltip="Esc" data-position="bottom center"/>
        <!-- <sui-button @click="info()" icon ="button" data-position="bottom center"/> -->
        <InfoBox :graf-data="this.graf"
        v-if="selection.selectedNodes.size || selection.selectedEdges.size" v-bind:selected="selection" 
        @del-node="onInfoNodeDel"
        @des-node="onInfoNodeDes"
        @del-edge="onInfoEdgeDel"
        @des-edge="onInfoEdgeDes"> </InfoBox>

        <!-- <div class="labeler"  v-if="currentTool=='Label' && selection.selectedLabel"
         style="margin: 1em 0em 0em"
        >
          <sui-input v-model="selection.selectedLabel.name" @keypress.stop />
          <br />
          Change Label
        </div> -->
      </header>
			

      <sui-dropdown
        class="fixedTR icon"
        icon="settings"
        button
        pointing="top right"
        floating
      >
        <sui-dropdown-menu>
          <sui-dropdown-item>
            <router-link to="/about">About</router-link>
          </sui-dropdown-item>

          <sui-dropdown-item> 
            <a @click="$root.$emit('openHelp')">Help</a>
          </sui-dropdown-item>
        </sui-dropdown-menu>
      </sui-dropdown>
      
      <D3Network
        id="grafNet"
        :net-nodes="graf.nodes"
        :net-links="graf.links"
        :options="options"
        @node-click="handle_node_click"
        @link-click="handle_edge_click"
      />

      <div class="fixedBC graf-labeler">
        <sui-button @click="onSaveImage();" color="green" content="Save Image"/>
        <sui-button @click="onSaveGraf();" color="green" content="Save Graph"/>
        <sui-button @click="onLoad();" color="green" content="Load Graph"/>
        <sui-button @click="onResetGraf();" color="green" content="Reset Graph"/>
        <br>
        <input id="fileload" type="file" style="display:none" ref="fileload" @change="onFileUpload();">
      </div>
      <Help/>
      <Load
      @Load-File='onLoadGraf'
      @preset-load='onPresetLoad'/>


    </center>
    <svg>
      <defs>
        <marker id="target-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" >
          <path v-bind:fill= edgeColor d="M0,0 L0,6 L9,3 z"></path>
        </marker>
        <marker id="source-arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" >
          <path v-bind:fill= edgeColor d="M0,3 L9,6 L9,0 z"></path>
        </marker>
      </defs>
    </svg>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import grafhelpers from '../middleware/helperFunctions';
import Toolbar from '../components/Toolbar.vue'
import GrafTools from '../middleware/grafTools.js'
import PathTools from '../middleware/pathTools.js'
import helperFunctions from '../middleware/helperFunctions';
//import Algorithms from '../middleware/algorithms.js'
import CookieHelpers from '../middleware/cookieHelper';
import Load from "../components/Load.vue"
import Help from "../components/Help.vue"
import Settings from "../components/Settings.vue"
import InfoBox from "./InfoBox.vue";

//import About from 'About.vue'

export default {
  name: "Graf",
  components: {
    D3Network,
    Toolbar,
    Settings,
    Help,
    Load,
    InfoBox
  },
  mounted () {
			document.addEventListener("keyup", this.keyup_handler, false);
      window.addEventListener('resize', this.resize_handler, false);
      GrafTools.new_node(this.graf);
      //this.graf = Object.assign({},this.graf);
      
      //Loading in the graf from cookies
      //CookieHelpers.checkRepCookie();
      //if (!CookieHelpers.isC) {
      //  var d = grafhelpers.loadGraf(CookieHelpers.getCookie("GrafData"));
      //  this.graf = d;
      //}
      
      this.graf = CookieHelpers.mountedCookie();
      //workaround to make edges show on reload
      this.change_tool("Edge");
      this.handle_node_click(this.graf.nodes[0]);
      this.change_tool("Select");
      this.handle_node_click(this.graf.nodes[0]);
  },
  data() {
    return {
        currentTool: "",
        algType: "",
        edgeType: "undir",
        grafData: "",
        Toggled: false,
        edgeColor: "#919191",
        history: {
            previous: [],
            next: []
        },
        selection: {
          selectedCurrent: null,
          selectedLast: null,
          selectedLabel: null,
          selectMultiple: true,
          selectedNodes: new Set(),
          selectedEdges: new Set()
        },
        graf: {
          nodes: [],
          links: [],
          aggCount: 0,
        },
        options: {
            force: 3000,
            size:{ w: Math.max(1020,window.innerWidth - 200), h: Math.max(720,window.innerHeight - 210)},
            resizeListener: true,
            nodeSize: 20,
            nodeLabels: true,
            linkLabels: false,
            canvas: false,
            linkWidth: 3,
            fontSize: 15
        }
    };
  },
  methods: {
    onSaveImage() {
      grafhelpers.screenshotGraf(document.getElementsByClassName("net-svg")[0]);
    },
    onSaveGraf() {
      grafhelpers.saveGraf(this.graf);
    },
    onLoad(){
      this.$root.$emit('openLoad');
    },
    onLoadGraf() { 
      const elem = this.$refs.fileload;
      elem.click();
    },
    onPresetLoad(data) {
      this.graf = grafhelpers.loadGraf(data);

      //workaround to make edges show on load
      this.change_tool("Edge");
      this.handle_node_click(this.graf.nodes[0]);
      this.change_tool("Select");
      this.handle_node_click(this.graf.nodes[0]);
    },
    onFileUpload() {
        if ('files' in this.$refs.fileload) {
            const file = this.$refs.fileload.files[0];
            file.text().then(text => {
              const data = grafhelpers.loadGraf(text);
              this.graf = data;
            });
        }
    },
    sideBarCheck: function(event) {
      //event;
      var x = event.clientX;
      //var y = event.clientY;
      if(x < 200) {
        this.Toggled = true;
      } else if (x < 200 && this.Toggled) {
        this.Toggled = true;
      } else {
        this.Toggled = false;
      }
    },
    onResetGraf() {
      this.graf.nodes = [];
      this.graf.links = [];
      this.grafData = "";
      this.graf.aggCount = 0;
      GrafTools.new_node(this.graf);
      this.options.nodeSize = 20
      this.options.force = 3000;
      this.options.linkWidth = 3;
      this.options = Object.assign({},this.options)
      this.$root.$emit('resetSliders')
      this.selection.selectedNodes = new Set();
      this.selection.selectedEdges = new Set();
      //Modifying cookie
      var s = CookieHelpers.compressGraf(JSON.stringify(this.graf));
      CookieHelpers.putCookie("GrafData", s);
    },
    onSliderChange(val, need) {
      if(need == 1) {this.options.nodeSize = val}
      if(need == 2) {this.options.force = (1/val)*10000}
      if(need == 3) {this.options.linkWidth = val}
      this.options = Object.assign({},this.options)
      
    },
    onColorChange(color, need){
      var r = document.querySelector(':root');
      if(need == 1) {
        for(var node in this.graf.nodes){
          this.graf.nodes[node]._color = color;
        }
      }
      if(need == 2) {
        this.edgeColor = color;
        for(var edge in this.graf.links){
          this.graf.links[edge]._color = color;
        }
      }
      if(need == 3) r.style.setProperty('--node', color);
      if(need == 4) r.style.setProperty('--edge', color);
      this.graf.nodes.push({ id: -1 });
      this.graf.nodes.splice(this.graf.nodes.length - 1, 1);
    },
    onEdgeChange(){
      this.options.linkLabels = !this.options.linkLabels
      this.options = Object.assign({},this.options)
    },
    onInfoNodeDel(node) {
      grafhelpers.color_graf(this.graf, 'black', 'node', new Set([node]));
      this.selection.selectedNodes.delete(node);
      for (let link of this.graf.links) {
        //console.log(link.sid, " ", link.tid);
        if(link.sid == node.id || link.tid == node.id) {
          grafhelpers.color_graf(this.graf, '#919191', 'edge', new Set([link]));
          this.selection.selectedEdges.delete(link);
        }
      }
      this.selection = Object.assign({},this.selection);
      //GrafTools.clear_selection(this.graf, node);
      GrafTools.removeNode(this.graf, node.id);
      
    },
    onInfoNodeDes(node) {
      grafhelpers.color_graf(this.graf, 'black', 'node', new Set([node]));
      this.selection.selectedNodes.delete(node);
      this.selection = Object.assign({},this.selection);
    },
    onInfoEdgeDel(edge) {
      grafhelpers.color_graf(this.graf, '#919191', 'edge', new Set([edge]));
      this.selection.selectedEdges.delete(edge);
      this.selection = Object.assign({},this.selection);
      //GrafTools.clear_selection(this.graf, node);
      GrafTools.removeLink(this.graf, edge.id);
      
    },
    onInfoEdgeDes(edge) {
      grafhelpers.color_graf(this.graf, '#919191', 'edge', new Set([edge]));
      this.selection.selectedEdges.delete(edge);
      this.selection = Object.assign({},this.selection);
    },
    // info(){
    //   console.log(CookieHelpers.getCookie("GrafData"));
    //   // this.$root.$emit('openLoad')
      
    // },
    onAlgorithmChange(alg) {
        this.algType = alg;
    },
    onUndo() {
        this.graf = helperFunctions.updateHistory(this.graf, this.history, true);
        //Modifying cookie
        CookieHelpers.putCookie("GrafData", CookieHelpers.compressGraf(JSON.stringify(this.graf)));
    },
    onRedo() {
        this.graf = helperFunctions.updateHistory(this.graf, this.history, false);
        //Modifying cookie
        CookieHelpers.putCookie("GrafData", CookieHelpers.compressGraf(JSON.stringify(this.graf)));
    },
    useTool(tool) {
      var oldData = JSON.stringify(this.graf);

      switch (tool) {
        case "Select":
          break;
        case "Node":
          GrafTools.new_node(this.graf);
          break;
        case "Edge":
          GrafTools.new_edge(this.graf, this.selection, this.edgeType);
          break;
        case "Algorithm":
          this.selection.selectMultiple = true;
          PathTools.algorithm(this.graf, this.selection, this.algType);
          break;
        case "Erase":
          GrafTools.erase(this.graf, this.selection);
          this.$root.$emit('resetColors')
          break;
        case "Contract":
          GrafTools.contract(this.graf, this.selection);
          this.$root.$emit('resetColors')
          break;
        default:
          break;
      }
      //Modifying cookie
      CookieHelpers.putCookie("GrafData", CookieHelpers.compressGraf(JSON.stringify(this.graf)));
    

      var newData = JSON.stringify(this.graf);
      if (oldData != newData) {
        this.history.previous.unshift(oldData);
        this.history.next = [];
      }
    },
    handle_node_click(event,node) {
        this.selection.selectedLast = this.selection.selectedCurrent;
        this.selection.selectedCurrent = node;
        this.selection.selectedLabel = node;
        GrafTools.update_selection(this.graf, node, 'node', this.selection);
        this.$root.$emit('resetColors')
        this.useTool(this.currentTool);
        //Modifying cookie
        CookieHelpers.putCookie("GrafData", CookieHelpers.compressGraf(JSON.stringify(this.graf)));
    },
    handle_edge_click(event,edge) {
        this.selection.selectedLabel = edge;
        GrafTools.update_selection(this.graf, edge, 'edge', this.selection);
        this.$root.$emit('resetColors')
        this.useTool(this.currentTool);
        //Modifying cookie
        CookieHelpers.putCookie("GrafData", CookieHelpers.compressGraf(JSON.stringify(this.graf)));
    },
    change_tool(tool) {
      if (tool == "Select") this.selection.selectMultiple = true;
      else this.selection.selectMultiple = false;
      this.selection.selectedCurrent = null;
      this.selection.selectedLast = null;
      this.selection.selectedLabel = null;
      this.currentTool = tool;
      this.useTool(tool);
    },
    change_edge (edgeType) {
      this.edgeType = edgeType;
    },
    clear_selections(){
        PathTools.update_distances(this.graf, null, false);
        GrafTools.clear_selection(this.graf, this.selection);
        this.$root.$emit('resetColors')

    },
    keyup_handler(event) {
      if (event.code == "Escape") {this.clear_selections()}
      if (event.ctrlKey && event.code === "KeyZ") this.onUndo();
      if (event.ctrlKey && event.code === "KeyY") this.onRedo();
      if (event.ctrlKey && event.code === "KeyC") this.info();
    },
    resize_handler() {
      this.options.size.w = Math.max(1020, window.innerWidth - 200);
      this.options.size.h = Math.max(720, window.innerHeight - 210);
      // Hacky BS to force update of the d3 network, should fork and workaround
      this.graf.nodes.push({ id: -1 });
      this.graf.nodes.splice(this.graf.nodes.length - 1, 1);
    },
  },
};
</script>

<style scoped>
.fixedTR {
  position: fixed;
  top: 0;
  right: 0;
}
.fixedBR {
  position: fixed;
  bottom: 0;
  right: 0;
}
.fixedTC {
  position: fixed;
  width: 800px;
  height: 80px;
  top: 0;
  right: 50%;
  margin-right: -400px;
}
.fixedBC{
  position:fixed;
  width: 480;
  height: 80px;
  bottom:0;
  right:50%;
  margin-right: -250px;
  margin-bottom: auto;
}
#source-arrow path, #target-arrow{
  fill: rgba(0, 0, 0, 1);
}
.slider {
  -webkit-appearance: none;
  width: 100%;
  height: 15px;
  border-radius: 5px;  
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: .2s;
  transition: opacity .2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%; 
  background: #25df2c;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #25df2c;
  cursor: pointer;
}

</style>

<style>
:root{
  --node: "#000000";
  --edge: "#000000";
}
.node-label{
  fill: var(--node);
}
.link-label{
  fill: var(--edge);
  transform: translate(0px,-10px);
  /* fill: rgb(46, 221, 46); */
  
}
</style>
