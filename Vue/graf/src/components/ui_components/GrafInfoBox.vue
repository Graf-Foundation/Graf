<template>
  <div>
    <v-navigation-drawer
			v-model="drawer"
			v-on:input="$emit('close-drawer', input)"
			absolute
			bottom
			temporary
			>
			<v-list>
				<v-list-item
					v-for="node in selectedNodes" :key="node">
					<v-list-item-content>
						<v-list-item-title>Node {{ node }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
	name: "GrafInfoBox",
	props: ["drawer", "model"],
	computed: {
		selectedNodes: function() {
			return this.model.selection ? this.model.selection.getSelectedNodeIds() : [];
		}
	}
};
</script>
