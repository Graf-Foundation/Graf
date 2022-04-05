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
								<v-row>
									<v-col style="margin-top: 8px">
										Info about the node I guess
									</v-col>
									<v-col cols = 3>
										<div class = "toolbar-flex" style = "justify-content: space-between">
											<v-dialog v-model="nodeDialog" width="500">
												<template v-slot:activator="{ on, attrs }">
													<v-btn icon v-bind="attrs" v-on="on"><v-icon medium>mdi-cog</v-icon></v-btn>
												</template>
											<InfoBoxSettings :info="value" v-on:updateNode="updateNode"></InfoBoxSettings>
											</v-dialog>
										</div>
									</v-col>
								</v-row>
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
								<v-row>
									<v-col style="margin-top: 8px">
										Info about the link I guess
									</v-col>
									<v-col cols = 3>
										<div class = "toolbar-flex" style = "justify-content: space-between">
											<v-dialog v-model="linkDialog" width="500">
												<template v-slot:activator="{ on, attrs }">
													<v-btn icon v-bind="attrs" v-on="on"><v-icon medium>mdi-cog</v-icon></v-btn>
												</template>
											<InfoBoxSettings :info="value" v-on:updateLink="updateLink"></InfoBoxSettings>
											</v-dialog>
										</div>
									</v-col>
								</v-row>
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
import InfoBoxSettings from "./InfoBoxSettings.vue";
export default {
	name: "InfoBox",
	props: ["graph"],
	components: {
		InfoBoxSettings
	},
	data: () => ({
		open: true,
		nodeDialog: false,
		linkDialog: true
	}),
	methods: {
		updateNode() {
			this.nodeDialog = false;
		},
		updateLink() {
			this.linkDialog = false;
		}
	}
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