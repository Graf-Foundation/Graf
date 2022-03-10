<template>
  <v-card v-card v-if="this.tool" class="toolTip" elevation="2">
    <v-card-actions v-if="open === false">
      <v-btn icon @click="open = true">
        <v-icon medium>mdi-chevron-up</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card v-if="open">
      <v-card-title>
        {{ this.tool.toolName() }}
        <v-btn v-if="open" icon @click="open = false" style="margin-left: auto;">
          <v-icon medium>mdi-chevron-down</v-icon>
        </v-btn>
      </v-card-title>
      <v-card-text>
        <v-row v-for="(value, key) in this.tool.toolTips()" :key="key">
          <v-col icon cols="3">
            <v-icon v-if="key === 'A'"> mdi-alpha-a-box-outline </v-icon>
            <v-icon v-if="key === 'Click'">
              mdi-cursor-default-click-outline
            </v-icon>
          </v-col>
          <v-col cols="9">
            {{ value }}
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script>
export default {
	name: "ToolUsage",
	props: ["tool"],
	data: () => ({
		open: true,
	}),
};
</script>

<style scoped>
</style>