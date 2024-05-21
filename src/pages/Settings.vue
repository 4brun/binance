<template>
  <v-container>
    <v-select
      v-model="orderStore.currentSymbol"
      label="Валютная пара"
      :items="orderStore.symbolList"
      variant="outlined"
    />

    <v-sheet rounded>
      <v-data-table
        :headers="headers"
        fixed-header
        fixed-footer
        height="calc(100vh - 18rem)"
        density="compact"
        :items="logsStore.logs"
        items-per-page="100"
      />
    </v-sheet>
  </v-container>
</template>

<script setup lang="ts">
import {useOrderStore} from "../stores/OrderStore"
import {useLogsStore} from "../stores/LogsStore";

const orderStore = useOrderStore()
const logsStore = useLogsStore()

const headers = [
  {
    value: 'name',
    title: 'Текущее значение'
  },
  {
    value: 'oldName',
    title: 'Прошлое значение'
  },
  {
    value: 'date',
    title: 'Время'
  }
]

</script>

<style scoped></style>
