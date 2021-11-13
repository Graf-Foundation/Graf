<template>
  <div id="graf-editor">
    <graf-editor-toolbar
        v-on:add-node-tool-click="grafModel.addNode('a');"
		v-on:add-edge-tool-click="grafModel.addEdge();"
		v-on:remove-tool-click="deletion();"
        v-on:pause-tool-click="simulation.stopSim();"
        v-on:play-tool-click="simulation.restartSim();"
				v-on:update-settings="updateSettings"
    />

    <GrafView 
		ref="View" :simData="graph" :model="grafModel" :settings="settings"
		v-on:node-click="nodeSelectionEvent($event)"
		v-on:link-click="edgeSelectionEvent($event)">
	</GrafView>
  </div>
</template>

<script>
import GrafView from "../components/GrafView.vue";
import GrafEditorToolbar from "@/components/ui_components/GrafEditorToolbar";
import {ForceSimWrapper} from "@/middleware/GrafForceSim";
import * as Model from "@/middleware/GrafModel";

export default {
	name: "GrafEditor",
	components: {
		GrafEditorToolbar,
		GrafView
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
			settings: {
				theme: "Light",
				grafDirected: false,
				grafForce: 100,
				grafEdgeThickness: 5
			}
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
		},
		deletion() {
			let edge_ids = this.grafModel.selection.getSelectedEdgeIds();
			let node_ids = this.grafModel.selection.getSelectedNodeIds();
			for (let e_id of edge_ids) {
				this.grafModel.removeEdge(parseInt(e_id));
			}
			for (let n_id of node_ids) {
				this.grafModel.removeNode(parseInt(n_id));
			}
			this.grafModel.selection = null;
		},
		updateSettings(value) {
			this.settings = value;
			this.simulation.updateForces({"charge": this.settings.grafForce});
			this.grafModel = new Model.Graph(this.simulation);
		}
	}
};
</script>

<style>

</style>
