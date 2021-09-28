<template>
  <v-toolbar>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>

    <v-row>
      <v-col cols="1">
        <!-- pause and play buttons -->
        <v-btn icon v-on:click="emit('pause-tool-click')"><v-icon>mdi-pause</v-icon></v-btn>
        <v-btn icon v-on:click="emit('play-tool-click')"><v-icon medium>mdi-play</v-icon></v-btn>
      </v-col>

      <!-- swap toolbar buttons -->
      <v-col cols="2" style="max-width: 150px;">
        <!-- tools bar -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on:click="barId=0" v-bind="attrs" v-on="on">
              <v-icon>mdi-tools</v-icon>
            </v-btn>
          </template>
          <span>Tools</span>
        </v-tooltip>

        <!-- algorithms bar -->
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on:click="barId=1" v-bind="attrs" v-on="on">
              <v-icon>
                mdi-family-tree
              </v-icon>
            </v-btn>
          </template>
          <span>Algorithms</span>
        </v-tooltip>

      </v-col>

      <!-- tools bar -->
      <v-col cols="9" v-if="barId===0">
        <v-btn class="tool-btn" v-on:click="emit('add-node-tool-click')">Add Node</v-btn>
        <v-btn class="tool-btn" v-on:click="emit('add-edge-tool-click')">Add Edge</v-btn>
        <v-btn class="tool-btn" v-on:click="emit('remove-tool-click')">Delete</v-btn>
        <v-btn class="tool-btn" v-on:click="emit('expand-tool-click')">Expand</v-btn>
        <v-btn class="tool-btn" v-on:click="emit('contract-tool-click')">Contract</v-btn>
      </v-col>

      <!-- algorithms bar -->
      <v-col cols="9" v-if="barId===1">
        <v-btn class="tool-btn" v-on:click="() => {}">BFS</v-btn>
        <v-btn class="tool-btn" v-on:click="() => {}">DFS</v-btn>
        <v-btn class="tool-btn" v-on:click="() => {}">SCC</v-btn>
        <v-btn class="tool-btn" v-on:click="() => {}">Top Sort</v-btn>
      </v-col>

      <!-- options -->
      <v-col cols="1">
        <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn style="float: right" icon v-bind="attrs" v-on="on"><v-icon medium>mdi-cog</v-icon></v-btn>
          </template>
          <GrafSettings/>
        </v-dialog>
      </v-col>

    </v-row>

  </v-toolbar>
</template>

<script>
import GrafSettings from "./GrafSettings.vue";
export default {
  name: "GrafEditorToolbar",
  components: {
    GrafSettings
  },
  data() {
    return {
      barId: 0
    }
  },
  methods:  {
    emit(eventString) {
      this.$emit(eventString);
    }
  }
}


</script>

<style>
  .tool-btn {
    margin-left: 10px;
    margin-top: 5px;
  }
</style>
