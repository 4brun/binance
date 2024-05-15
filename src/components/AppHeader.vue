<template>
  <v-app-bar rounded>
    <div class="w-100 d-flex align-center gap-2">
      <router-link to="/">
        <v-icon color="teal" class="mx-2">mdi-chart-bar</v-icon>
        <span class="text-h6 text-decoration-none mr-2">binance</span>
      </router-link>
      <v-btn small to="Settings">
        <v-icon left>mdi-cog</v-icon>
        settings
      </v-btn>
      <v-btn small to="OrderBook">
        <v-icon left>mdi-chart-bar-stacked</v-icon>
        order book
      </v-btn>
    </div>

  </v-app-bar>
</template>

<script setup lang="ts">

</script>

<style scoped></style>
