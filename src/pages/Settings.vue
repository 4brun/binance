<template>
  <v-container>

    <v-select
      v-model="appStore.currentSymbol"
      label="Валютная пара"
      :items="appStore.symbolList"
      variant="outlined"
    />
  </v-container>
</template>

<script setup lang="ts">
import {useAppStore} from "../stores/app";

const appStore = useAppStore()
</script>

<style scoped>

</style>
