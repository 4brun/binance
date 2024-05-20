<template>
  <v-app-bar rounded>
    <div class="w-100 d-flex align-center">
      <router-link to="/">
        <v-img
          src="../assets/logo.png"
          class="logo mx-2"
          contain
          height="50"
          width="50"
        />
      </router-link>
      <v-btn class="mx-1" small to="Settings" :icon="mobile">
        <v-icon left>mdi-cog</v-icon>
        <span v-show="!mobile">settings</span>
      </v-btn>
      <v-btn class="mx-1" small to="OrderBook" :icon="mobile">
        <v-icon left>mdi-chart-bar-stacked</v-icon>
        <span v-show="!mobile">order book</span>
      </v-btn>
    </div>

  </v-app-bar>
</template>

<script setup lang="ts">
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
</script>

<style scoped lang="scss">
.logo {
  transition: filter ease .5s;

  &:hover {
    filter: brightness(70%);
  }
}
</style>
