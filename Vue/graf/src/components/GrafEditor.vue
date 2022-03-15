<template>
	<div id="graf-editor">
		<graf-editor-toolbar ref="toolbar"
				:tool-code="this.toolCode"
				v-on:tool-click="setTool($event)"
				v-on:pause-tool-click="simulation.stopSim();"
				v-on:play-tool-click="simulation.restartSim();"
				v-on:update-settings="updateSettings"
				v-on:reset-graf="resetGraph()"
		/>

		<ToolUsage :tool="this.tool"></ToolUsage>

		<GrafView
				ref="View" :simData="graph" :model="grafModel" :settings="settings"
				v-on:node-click="nodeSelectionEvent($event)"
				v-on:link-click="edgeSelectionEvent($event)">
		</GrafView>
		<Settings ref="settings"></Settings>
	</div>
</template>

<script>
import GrafView from "../components/GrafView.vue";
import GrafEditorToolbar from "@/components/ui_components/GrafEditorToolbar";
import {ForceSimWrapper} from "@/middleware/GrafForceSim";
import * as Model from "@/middleware/GrafModel";
import * as Tools from "@/middleware/GrafTools";
import ToolUsage from "@/components/ui_components/ToolUsage";
import Settings from "@/components/ui_components/GrafSettings";

export default {
	name: "GrafEditor",
	components: {
		GrafEditorToolbar,
		GrafView,
		ToolUsage,
		Settings
	},
	mounted() {
		document.addEventListener("keyup", this.keyupHandler, false);
		this.simulation = new ForceSimWrapper(null, this.graph.nodes, this.graph.links);
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
				grafForce: 5,
				grafEdgeThickness: 5,
				nodeSize: 10
			},
			tool: null,
			toolCode: ""
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
		updateSettings(value) {
			this.settings = value;
			console.log(this.grafModel);
			this.grafModel.sim_wrapper.updateForces({"charge": this.settings.grafForce});
		},
		resetGraph() {
			this.graph = {links: [], nodes: []};
			this.simulation = new ForceSimWrapper(null, this.graph.nodes, this.graph.links);
			this.grafModel = new Model.Graph(this.simulation);
			this.settings = {
				theme: "Light",
				grafDirected: false,
				grafForce: 5,
				grafEdgeThickness: 5,
				nodeSize: 10
			};
			this.$refs.toolbar.play();
			this.$refs.settings.resetSettings();

		},
		keyupHandler(event) {
			if (event.code === "Escape" && this.grafModel.selection) {
				this.grafModel.selection.clearSelection();
			}
			if (event.code === "Space") {
				if(this.$refs.toolbar.playId === 0) {
					this.simulation.stopSim();
					this.$refs.toolbar.playId = 1;
				} else {
					this.simulation.restartSim();
					this.$refs.toolbar.playId = 0;
				}
			}
			if(this.tool) this.tool.handleKey(event, this.grafModel);
		},
		setTool(toolCode) {
			if(this.toolCode === toolCode) {
				Tools.setTool("", this, this.grafModel);
				this.toolCode = "";
			} else {
				Tools.setTool(toolCode, this, this.grafModel);
				this.toolCode = toolCode;
			}
		}
	}
};
</script>

<style>
 .toolTip {
	position: absolute;
	margin-left: 20px;
	margin-top: 20px;
 }
</style>
