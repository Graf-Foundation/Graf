<template>
	<v-tooltip bottom>
		<template v-slot:activator="{ on, attrs }">
			<v-btn icon v-on:click="emit('reset-graf')" v-bind="attrs" v-on="on">
				<v-icon>mdi-sync</v-icon>
			</v-btn>
		</template>
		<span>Reset Graph</span>
	</v-tooltip>
</template>

<script>
export default {
	name: "ToolTipButton",
	props: [""]
}
</script>

<style scoped>

</style>