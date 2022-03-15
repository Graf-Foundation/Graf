<template>
  <v-toolbar>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
		<div v-if="playId===0" class = "toolbar-flex" style = "width:5%; margin-left: 12px">
			<!-- pause and play buttons -->
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-on:click="pause()" v-bind="attrs" v-on="on">
						<v-icon>mdi-pause</v-icon>
					</v-btn>
				</template>
				<span>Pause Force Sim</span>
			</v-tooltip>
		</div>
		<div v-if="playId===1" class = "toolbar-flex" style = "width:5%; margin-left: 12px;">
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-on:click="play()" v-bind="attrs" v-on="on">
						<v-icon medium>mdi-play</v-icon>
					</v-btn>
				</template>
				<span>Resume Force Sim</span>
			</v-tooltip>
		</div>
		<div class = "toolbar-flex" style = "width:5%">
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
		<div v-if="barId===1" class = "toolbar-flex" style = "width:5%">
			<v-tooltip bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-on:click="barId=0" v-bind="attrs" v-on="on">
						<v-icon>mdi-tools</v-icon>
					</v-btn>
				</template>
			<span>Tools</span>
			</v-tooltip>
		</div>
		<div v-if="barId===0" class = "toolbar-flex" style = "width:5%">
			<!-- algorithms bar -->
			<v-tooltip bottom>
			<template v-slot:activator="{ on, attrs }">
				<v-btn  icon v-on:click="barId=1" v-bind="attrs" v-on="on">
					<v-icon>mdi-family-tree </v-icon>
				</v-btn>
			</template>
			<span>Algorithms</span>
			</v-tooltip>
		</div>

		<!-- tools bar -->
		<div v-if="barId===0" class = "toolbar-flex" style = "width: 80%">
			<v-btn class="tool-btn" :depressed="this.toolCode==='add-node'" v-on:click="emit('tool-click', 'add-node')">Add Node</v-btn>
			<v-btn class="tool-btn" :depressed="this.toolCode==='add-edge'" v-on:click="emit('tool-click', 'add-edge')">Add Edge</v-btn>
			<v-btn class="tool-btn" :depressed="this.toolCode==='delete'" v-on:click="emit('tool-click', 'delete')">Delete</v-btn>
			<v-btn class="tool-btn" :depressed="this.toolCode==='expand'" v-on:click="emit('tool-click', 'expand')">Expand</v-btn>
			<v-btn class="tool-btn" :depressed="this.toolCode==='contract'" v-on:click="emit('tool-click', 'contract')">Contract</v-btn>
		</div>
		<!-- algorithms bar -->
		<div v-if="barId===1" class = "toolbar-flex" style = "width: 80%">
			<v-btn class="tool-btn" v-on:click="() => {}">BFS</v-btn>
			<v-btn class="tool-btn" v-on:click="() => {}">DFS</v-btn>
			<v-btn class="tool-btn" v-on:click="() => {}">SCC</v-btn>
			<v-btn class="tool-btn" v-on:click="() => {}">Top Sort</v-btn>
		</div>

      <!-- options -->
	<div class = "toolbar-flex" style = "justify-content: space-between">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on"><v-icon medium>mdi-cog</v-icon></v-btn>
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
			playId: 0,
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
		},
		pause(){
			this.emit("pause-tool-click");
			this.playId = 1;
		},
		play(){
			this.emit("play-tool-click");
			this.playId = 0;
		}
	}
};


</script>

<style>
  .tool-btn {
    margin-left: 10px;
    margin-top: 5px;
  }
  .toolbar-flex {
	display:flex; 
	flex-direction:row; 
	align-items: center;
  }
</style>
