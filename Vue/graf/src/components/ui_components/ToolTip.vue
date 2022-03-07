<template>
	<v-card v-if="this.tool" class="toolTip" elevation="2">
		<v-card-title>
			{{this.tool.toolName()}}
		</v-card-title>
		<v-card-text>
			<v-row v-for="(value, key) in this.tool.toolTips()" :key="key">
				<v-col icon cols="3">
					<v-icon v-if="key === 'A'">
						mdi-alpha-a-box-outline
					</v-icon>
					<v-icon v-if="key === 'Click'">
						mdi-cursor-default-click-outline
					</v-icon>
				</v-col>
				<v-col cols ="9">
					{{value}}
				</v-col>
			</v-row>
		</v-card-text>
	</v-card>
</template>

<script>
export default {
	name: "ToolTip",
	props: ["tool"]
};
</script>

<style scoped>

</style>