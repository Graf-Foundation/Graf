<template>
  <div id="graf-editor">
    <graf-editor-toolbar
        v-on:add-node-tool-click="grafModel.addNode('a')"
        v-on:pause-tool-click="simulation.stopSim();"
        v-on:play-tool-click="simulation.restartSim();"
    />

    <GrafView ref="View" :simData="graph"></GrafView>
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
			simulation: null
		};
	},
	methods: {

	}
};
</script>

<style>

</style>
