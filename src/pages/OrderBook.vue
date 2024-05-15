<template>
  <v-container>
    {{ appStore.lastUpdateId }}
    <pre>{{ appStore.orders }}</pre>
    <v-divider/>
    <pre>{{ appStore.ordersFromStream }}</pre>
  </v-container>
</template>

<script setup lang="ts">
import {useAppStore} from "../stores/app";
import {onMounted} from "vue";

const appStore = useAppStore()

onMounted(appStore.getData)
</script>

<style scoped>
</style>
