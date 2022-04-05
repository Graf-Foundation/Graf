<template>
  <v-card class="infoBox" elevation="2">
    <v-card-actions v-if="open === false">
      <v-btn icon @click="open = true">
        <v-icon medium>mdi-chevron-up</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card v-if="open" style="width: 22vw">
      <v-card-title>
        Info Box
        <v-btn v-if="open" icon @click="open = false" style="margin-left: auto;">
          <v-icon medium>mdi-chevron-down</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
		<v-expansion-panels flat>
			<v-expansion-panel>
				<v-expansion-panel-header class = "v-expansion-panel-header-flat">
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
				<v-expansion-panel-header class = "v-expansion-panel-header-flat">
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
	right: 20px;
	margin-top: 20px;
 }
 .v-expansion-panel-header-flat{
	padding: 0;
	padding-left: 12px;
	padding-right: 18px;
}
</style>