<template>
  <div>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-list-item-action>
              <v-select :items="['Light', 'Dark']" label="Theme" v-bind:value="theme"></v-select>
            </v-list-item-action>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="grafDirected"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Directionality</v-list-item-title>
              <v-list-item-subtitle>Enable visualization of arrows on edges</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-slider v-model="grafForce"
                        label="Force of the graph"
                        min="0"
                        max="100"></v-slider>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text v-on:click="emit('close-dialog')">
          Close
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
		}
	},
	data: function () {
		return {
			theme: "Light"
		};
	}
};
</script>
