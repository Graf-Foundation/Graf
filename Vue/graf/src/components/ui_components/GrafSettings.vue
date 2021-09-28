<template>
  <div>
    <v-card>
      <v-card-title>Settings</v-card-title>
      <v-card-text>
        These are some settings. WIP.
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
  }
}
</script>
