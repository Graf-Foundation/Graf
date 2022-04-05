<template>
  <div>
    <v-card>
      <v-card-title> {{this.nodeSettings ? 'Node ' : 'Link '}} Settings</v-card-title>
		<v-card-text>
			PLACEHOLDER
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
	name: "InfoBoxSettings",
	props: ["info"],
	mounted() {
		if (this.info.source) { 
			this.nodeSettings = false;
		}
	},
	data() {
		return {
			nodeSettings: true
		};
	},
	methods: {
		emit(eventString) {
			this.$emit(eventString);
		},
		close() {
			if(this.nodeSettings){
				this.$emit("updateNode");
			} else {
				this.$emit("updateLink");
			}
		}
	},
};
</script>
