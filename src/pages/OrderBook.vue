<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <span class="text-h6">Bids</span>
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <span class="text-h6">Asks</span>
        <v-data-table
          :headers="headers"
          :density="true"
          :items="appStore.orders[0]?.a"
          items-per-page="5"
        >
          <template #item.price="{item}">
            {{ item }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    {{ appStore.lastUpdateId }}
    <pre>{{ appStore.orders }}</pre>
    <v-divider/>
    <pre>{{ appStore.ordersFromStream }}</pre>
  </v-container>
</template>

<script setup lang="ts">
type ITableHeader = { title?: string, value?: string }
import {useAppStore} from "../stores/app";
import {onMounted} from "vue";

const appStore = useAppStore()

const headers: ITableHeader[] = [
  {
    title: 'Price',
    value: 'price'
  },
  {
    title: 'Quantity',
    value: 'quantity'
  },
  {
    title: 'Total',
    value: 'total'
  }
]

onMounted(appStore.getData)
</script>

<style scoped></style>
