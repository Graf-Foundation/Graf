<template>
  <div>
    <v-navigation-drawer
        v-model="drawer"
				v-on:input="$emit('close-drawer', input)"
        absolute
        bottom
        temporary
        >
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
	name: "GrafInfoBox",
	props: ["drawer"]
};
</script>
