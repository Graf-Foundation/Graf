<template>
  <div id="graf-editor">
    <graf-editor-toolbar
        v-on:add-node-tool-click="grafModel.addNode('a');"
		v-on:add-edge-tool-click="grafModel.addEdge();"
        v-on:pause-tool-click="simulation.stopSim();"
        v-on:play-tool-click="simulation.restartSim();"
				v-on:drawer-click="drawer = !drawer;"
    />
		<GrafInfoBox v-bind:drawer="drawer" v-on:close-drawer="drawer = input"></GrafInfoBox>

    <GrafView 
		ref="View" :simData="graph"
		v-on:node-click="nodeSelectionEvent($event)"
		v-on:link-click="edgeSelectionEvent($event)">
	</GrafView>
  </div>
</template>

<script>
import GrafView from "../components/GrafView.vue";
import GrafEditorToolbar from "@/components/ui_components/GrafEditorToolbar";
import GrafInfoBox from "@/components/ui_components/GrafInfoBox";
import {ForceSimWrapper} from "@/middleware/GrafForceSim";
import * as Model from "@/middleware/GrafModel";

export default {
	name: "GrafEditor",
	components: {
		GrafEditorToolbar,
		GrafView,
		GrafInfoBox
	},
	mounted () {
		this.simulation = new ForceSimWrapper(null,
			this.graph.nodes,
			this.graph.links
		);

		this.grafModel = new Model.Graph(this.simulation);
	},
	data() {
		return {
			grafModel: null,
			graph: {
				links: [],
				nodes: []
			},
			simulation: null,
			drawer: false
		};
	},
	methods: {
		nodeSelectionEvent(node) {
			console.log(node.id);
			this.grafModel.selectNode(node.id);
		},
		edgeSelectionEvent(edge) {
			console.log(edge.id);
			this.grafModel.selectEdge(edge.id);
		}
	}
};
</script>

<style>

</style>
