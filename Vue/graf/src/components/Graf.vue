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

    <center>
      <header>

        <Toolbar @tool-change="change_tool" @alg-change="onAlgorithmChange"></Toolbar>
        <sui-button @click="onUndo();" icon="undo" />
        <sui-button @click="onRedo();" icon="redo" />
      </header>

      <div class="labeler"  v-if="currentTool=='Label' && selection.selectedLabel"
       style="margin: 1em 0em 0em"
      >
        <sui-input v-model="selection.selectedLabel.name" @keypress.stop />
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
    <Help></Help>

    </center>
  </div>
</template>

<script>
import D3Network from 'vue-d3-network';
import grafhelpers from '../middleware/helperFunctions';
import Toolbar from '../components/Toolbar.vue'
import GrafTools from '../middleware/grafTools.js'
import helperFunctions from '../middleware/helperFunctions';
import Help from "../components/Help.vue";
//import About from 'About.vue'


export default {
  name: 'Graf',
  components: {
    D3Network,
    Toolbar,
    Help
  },
  mounted () {
			document.addEventListener("keyup", this.keyup_handler, false);
      window.addEventListener('resize', this.resize_handler, false);
  },
  data () {
    return {
        currentTool: "",
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
          pathActive: false
        },
        options: {
            force: 3000,
            size:{ w: window.innerWidth - 100, h: window.innerHeight - 210},
            resizeListener: true,
            nodeSize: 20,
            nodeLabels: true,
            linkLabels:true,
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
        var data = grafhelpers.loadGraf(this.grafData);
        this.graf = data;
        this.grafData = "";
    },
    onResetGraf() {
        this.graf.nodes = [{ id: 0 }];
        this.graf.links = [];
        this.grafData = "";
        this.graf.aggCount = 1;
    },
    onAlgorithmChange(alg) {
        this.selection.selectedAlgorithm = alg;
    },
    onUndo() {
        this.graf = helperFunctions.updateHistory(this.graf, this.history, true);
    },
    onRedo() {
        this.graf = helperFunctions.updateHistory(this.graf, this.history, false);
    },
    useTool(tool) {
      var oldData = JSON.stringify(this.graf);

      switch(tool){
        case "Select":
          break;
        case "Node":
          GrafTools.new_node(this.graf);
          this.graf.aggCount += 1;
          break;
        case "Edge":
          GrafTools.new_edge(this.graf, this.selection);
          break;
        case "Algorithm":
          GrafTools.algorithm(this.graf, this.selection);
          break;
        case "Erase":
          GrafTools.erase(this.graf, this.selection);
          break;
        default:
          break;
      }

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
    keyup_handler(event) {
      if(event.cpde == "Escape") {
        GrafTools.update_distances(this.graf, null, false);
        GrafTools.clear_selection(this.graf, this.selection)
      }
      if(event.ctrlKey && event.code === 'KeyZ')
        this.onUndo();
      if(event.ctrlKey && event.code === 'KeyY')
        this.onRedo();
    },
    resize_handler() {
      this.options.size.w = window.innerWidth - 100;
      this.options.size.h = window.innerHeight - 210;
      // Hacky BS to force update of the d3 network, should fork and workaround
      this.graf.nodes.push({id: -1});
      this.graf.nodes.splice(this.graf.nodes.length-1,1)
    }
  }
}

</script>

<style scoped>

</style>
