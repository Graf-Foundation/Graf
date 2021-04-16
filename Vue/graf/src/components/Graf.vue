<template>
  <div class="graf">
    <center>
      <header class="fixedTC">
        <Toolbar @tool-change="change_tool" @edge-change="change_edge" @alg-change="onAlgorithmChange"></Toolbar>

        <sui-button @click="onUndo();" icon="undo" />
        <sui-button @click="onRedo();" icon="redo" />
        <InfoBox :selected="selection.selectedLabel"> </InfoBox>

        <div class="labeler"  v-if="currentTool=='Label' && selection.selectedLabel"
         style="margin: 1em 0em 0em"
        >
          <sui-input v-model="selection.selectedLabel.name" @keypress.stop />
          <br>
          Change Label
        </div>
      </header>

      <sui-dropdown class="fixedTR icon" icon="settings" button pointing="top right" floating>
        <sui-dropdown-menu>
          <sui-dropdown-item>
            <router-link to="/about">About</router-link>
          </sui-dropdown-item>

          <sui-dropdown-item>Settings</sui-dropdown-item>
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
        <sui-button @click="onLoadGraf();" color="green" content="Load Graph"/>
        <sui-button @click="onResetGraf();" color="green" content="Reset Graph"/>
        <br>
        <input id="fileload" type="file" style="display:none" ref="fileload" @change="onFileUpload();">
      </div>
      <Help/>



    </center>
    <svg >
      <defs>
        <marker id="target-arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" >
          <path d="M0,0 L0,6 L9,3 z"></path>
        </marker>
        <marker id="source-arrow" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto" markerUnits="strokeWidth" >
          <path d="M0,3 L9,6 L9,0 z"></path>
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
import CookieHelpers from '../middleware/cookieHelper';
import Help from "../components/Help.vue";
import InfoBox from "./InfoBox.vue";
//import About from 'About.vue'


export default {
  name: 'Graf',
  components: {
    D3Network,
    Toolbar,
    Help,
    InfoBox
  },
  mounted () {
			document.addEventListener("keyup", this.keyup_handler, false);
      window.addEventListener('resize', this.resize_handler, false);
      //Loading in the graf from cookies
      CookieHelpers.checkRepCookie();
      if(!CookieHelpers.isC) {
        var d = grafhelpers.loadGraf(CookieHelpers.getCookie("GrafData"));
        this.graf = d;
      }
  },
  data () {
    return {
        currentTool: "",
        edgeType: "undir",
        grafData: "",
        history: {
            previous: [],
            next: []
        },
        selection: {
          selectedAlgorithm: null,
          selectedCurrent: null,
          selectedLast: null,
          selectedLabel: null,
          selectMultiple: true,
          selectedNodes: new Set(),
          selectedEdges: new Set()
        },
        graf: {
          nodes: [{ id: 0 }],
          links: [],
          aggCount: 1,
        },
        options: {
            force: 3000,
            size:{ w: Math.max(1020,window.innerWidth - 200), h: Math.max(720,window.innerHeight - 210)},
            resizeListener: true,
            nodeSize: 20,
            nodeLabels: true,
            linkLabels:false,
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
    onLoadGraf() {
        const elem = this.$refs.fileload;
        elem.click();
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
    onResetGraf() {
        this.graf.nodes = [{ id: 0 }];
        this.graf.links = [];
        this.grafData = "";
        this.graf.aggCount = 1;
      //Modifying cookie
      CookieHelpers.putCookie("GrafData", JSON.stringify(this.graf));
    },
    onAlgorithmChange(alg) {
        this.selection.selectedAlgorithm = alg;
    },
    onUndo() {
        this.graf = helperFunctions.updateHistory(this.graf, this.history, true);
        //Modifying cookie
        CookieHelpers.putCookie("GrafData", JSON.stringify(this.graf));
    },
    onRedo() {
        this.graf = helperFunctions.updateHistory(this.graf, this.history, false);
        //Modifying cookie
        CookieHelpers.putCookie("GrafData", JSON.stringify(this.graf));
    },
    useTool(tool) {
      var oldData = JSON.stringify(this.graf);

      switch(tool){
        case "Select":
          break;
        case "Node":
          GrafTools.new_node(this.graf);
          break;
        case "Edge":
          GrafTools.new_edge(this.graf, this.selection, this.edgeType);
          break;
        case "Algorithm":
          GrafTools.algorithm(this.graf, this.selection);
          break;
        case "Erase":
          GrafTools.erase(this.graf, this.selection);
          break;
        case "Contract":
          GrafTools.contract(this.graf, this.selection);
          break;
        default:
          break;
      }
      //Modifying cookie
      CookieHelpers.putCookie("GrafData", JSON.stringify(this.graf));

      var newData = JSON.stringify(this.graf);
      if(oldData != newData) {
        this.history.previous.unshift(oldData);
        this.history.next = [];
      }
    },
    handle_node_click(event,node) {
        this.selection.selectedLast = this.selection.selectedCurrent;
        this.selection.selectedCurrent = node;
        this.selection.selectedLabel = node;
        GrafTools.update_selection(this.graf, node, 'node', this.selection);
        this.useTool(this.currentTool);
    },
    handle_edge_click(event,edge) {
        this.selection.selectedLabel = edge;
        GrafTools.update_selection(this.graf, edge, 'edge', this.selection);
        this.useTool(this.currentTool);
    },
    change_tool (tool) {
        if(tool == 'Select') this.selection.selectMultiple = true;
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
    keyup_handler(event) {
      if(event.code == "Escape") {
        PathTools.update_distances(this.graf, null, false);
        GrafTools.clear_selection(this.graf, this.selection)
      }
      if(event.ctrlKey && event.code === 'KeyZ')
        this.onUndo();
      if(event.ctrlKey && event.code === 'KeyY')
        this.onRedo();
    },
    resize_handler() {
      this.options.size.w = Math.max(1020,window.innerWidth - 200);
      this.options.size.h = Math.max(720,window.innerHeight - 210);
      // Hacky BS to force update of the d3 network, should fork and workaround
      this.graf.nodes.push({id: -1});
      this.graf.nodes.splice(this.graf.nodes.length-1,1)
    }
  }
}

</script>

<style scoped>
.fixedTR{
  position:fixed;
  top:0;
  right: 0;
}
.fixedBR{
  position:fixed;
  bottom: 0;
  right: 0;
}
.fixedTC{
  position:fixed;
  width: 800px;
  height: 80px;
  top:0;
  right:50%;
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
</style>
