<template>
  <v-toolbar>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
		<div>
			<!-- pause and play buttons -->
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-on:click="emit('pause-tool-click')" v-bind="attrs" v-on="on">
						<v-icon>mdi-pause</v-icon>
					</v-btn>
				</template>
				<span>Pause Force Sim</span>
			</v-tooltip>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-on:click="emit('play-tool-click')" v-bind="attrs" v-on="on">
						<v-icon medium>mdi-play</v-icon>
					</v-btn>
				</template>
				<span>Resume Force Sim</span>
			</v-tooltip>
		</div>
		<div>
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-on:click="emit('reset-graf')" v-bind="attrs" v-on="on">
						<v-icon>mdi-sync</v-icon>
					</v-btn>
				</template>
				<span>Reset Graph</span>
			</v-tooltip>
		</div>
      <!-- swap toolbar buttons -->
        <!-- tools bar -->
		<div>
			<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind:class="{active: barId===0}" icon v-on:click="barId=0" v-bind="attrs" v-on="on">
				<v-icon>mdi-tools</v-icon>
				</v-btn>
			</template>
			<span>Tools</span>
			</v-tooltip>

			<!-- algorithms bar -->
			<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn v-bind:class="{active: barId===1}" icon v-on:click="barId=1" v-bind="attrs" v-on="on">
				<v-icon>
					mdi-family-tree
				</v-icon>
				</v-btn>
			</template>
			<span>Algorithms</span>
			</v-tooltip>
		</div>

		<!-- tools bar -->
		<div>
			<v-btn class="tool-btn" :depressed="this.toolCode==='add-node'" v-on:click="emit('tool-click', 'add-node')">Add Node</v-btn>
			<v-btn class="tool-btn" :depressed="this.toolCode==='add-edge'" v-on:click="emit('tool-click', 'add-edge')">Add Edge</v-btn>
			<v-btn class="tool-btn" :depressed="this.toolCode==='delete'" v-on:click="emit('tool-click', 'delete')">Delete</v-btn>
			<v-btn class="tool-btn" :depressed="this.toolCode==='expand'" v-on:click="emit('tool-click', 'expand')">Expand</v-btn>
			<v-btn class="tool-btn" :depressed="this.toolCode==='contract'" v-on:click="emit('tool-click', 'contract')">Contract</v-btn>
		</div>
		<!-- algorithms bar -->
		<div>
			<v-btn class="tool-btn" v-on:click="() => {}">BFS</v-btn>
			<v-btn class="tool-btn" v-on:click="() => {}">DFS</v-btn>
			<v-btn class="tool-btn" v-on:click="() => {}">SCC</v-btn>
			<v-btn class="tool-btn" v-on:click="() => {}">Top Sort</v-btn>
		</div>

      <!-- options -->
	<div>
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn style="float: right" icon v-bind="attrs" v-on="on"><v-icon medium>mdi-cog</v-icon></v-btn>
          </template>
          <GrafSettings v-on:settings="updateSettings"></GrafSettings>
        </v-dialog>
	</div>
  </v-toolbar>
</template>

<script>
import GrafSettings from "./GrafSettings.vue";
export default {
	name: "GrafEditorToolbar",
	props: ["toolCode"],
	components: {
		GrafSettings
	},
	data() {
		return {
			barId: 0,
			dialog: false
		};
	},
	methods:  {
		emit(eventString, value) {
			this.$emit(eventString, value);
		},
		updateSettings(value) {
			this.$emit("update-settings", value);
			this.dialog = false;
		}
	}
};


</script>

<style>
  .tool-btn {
    margin-left: 10px;
    margin-top: 5px;
  }
  .active {
	background-color:rgba(179, 179, 179, 0.527);
  }
</style>
