<template>
  <v-card class="infoBox" elevation="2">
    <v-card-actions v-if="open === false">
      <v-btn icon @click="open = true">
        <v-icon medium>mdi-chevron-up</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card v-if="open" style="width: 25vw">
      <v-card-title>
        INFO BOX
        <v-btn v-if="open" icon @click="open = false" style="margin-left: auto;">
          <v-icon medium>mdi-chevron-down</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header>
					Nodes
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-expansion-panels>
						<v-expansion-panel
							v-for="(value,key) in this.graph.nodes"
							:key="key"
						>
							<v-expansion-panel-header>{{value.id}}</v-expansion-panel-header>
							<v-expansion-panel-content>
								Info about the node I guess
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-expansion-panel-content>
			</v-expansion-panel>
			<v-expansion-panel>
				<v-expansion-panel-header>
					Links
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<v-expansion-panels>
						<v-expansion-panel
							v-for="(value,key) in this.graph.links"
							:key="key"
						>
							<v-expansion-panel-header>{{value.id}}</v-expansion-panel-header>
							<v-expansion-panel-content>
								Info about the link I guess
							</v-expansion-panel-content>
						</v-expansion-panel>
					</v-expansion-panels>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
	name: "InfoBox",
	props: ["graph"],
	data: () => ({
		open: true,
	}),
};
</script>

<style scoped>
.infoBox {
	position: absolute;
	/* margin-left: 20px; */
	margin-top: 20px;
 }
</style>