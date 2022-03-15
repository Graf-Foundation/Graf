<template>
  <div>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-select :items="['Light']" label="Theme" v-bind:value="theme"></v-select>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-slider v-model="grafForce"
                        label="Force of the graph"
                        min="0"
                        max="15"
						:value="grafForce">
                <template v-slot:append>
                  <v-text-field 
                          v-model="grafForce"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          ></v-text-field>
                </template>
              </v-slider>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-slider v-model="grafEdgeThickness"
                        label="Edge Thickness"
                        min="1"
                        max="15"
						:value="grafEdgeThickness">
                <template v-slot:append>
                  <v-text-field 
                          v-model="grafEdgeThickness"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          ></v-text-field>
                </template>
              </v-slider>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-slider v-model="nodeSize"
                        label="Node Size"
                        min="1"
                        max="15"
						:value="nodeSize">
                <template v-slot:append>
                  <v-text-field 
                          v-model="nodeSize"
                          class="mt-0 pt-0"
                          hide-details
                          single-line
                          type="number"
                          style="width: 60px"
                          ></v-text-field>
                </template>
              </v-slider>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text v-on:click="close()">
          Apply
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
	name: "GrafSettings",
	methods: {
		emit(eventString) {
			this.$emit(eventString);
		},
		close() {
			const settings = {
				theme: this.theme,
				grafDirected: this.grafDirected,
				grafForce: this.grafForce,
				grafEdgeThickness: this.grafEdgeThickness,
				nodeSize: this.nodeSize
			};
			this.$emit("settings", settings);
		}
	},
	data: function () {
		return {
			theme: "Light",
			grafDirected: false,
			grafForce: 5,
			grafEdgeThickness: 5,
			nodeSize: 10
		};
	}
};
</script>
