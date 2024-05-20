<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-sheet class="ma-1 pa-1" rounded>
          <span class="text-h6 px-2">Bids</span>
          <v-data-table
            :headers="headers"
            fixed-header
            fixed-footer
            height="calc(100vh - 16rem)"
            density="compact"
            :items="bids"
            items-per-page="100"
            :items-per-page-options="itemsPerPageOptions"
          >
            <template #item.price="{item}">
              {{ usePriceNormalizer(item[0]) }}
            </template>
            <template #item.quantity="{item}">
              {{ item[1] }}
            </template>
            <template #item.total="{item}">
              <strong>
                {{ usePriceNormalizer(item[0] * item[1]) }}
              </strong>
            </template>
          </v-data-table>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="6">
        <v-sheet class="ma-1 pa-1" rounded>
          <span class="text-h6 px-2">Asks</span>
          <v-data-table
            :headers="headers"
            fixed-header
            fixed-footer
            height="calc(100vh - 16rem)"
            density="compact"
            :items="asks"
            items-per-page="100"
            :items-per-page-options="itemsPerPageOptions"
          >
            <template #item.price="{item}">
              {{ usePriceNormalizer(item[0]) }}
            </template>
            <template #item.quantity="{item}">
              {{ item[1] }}
            </template>
            <template #item.total="{item}">
              <strong>
                {{ usePriceNormalizer(item[0] * item[1]) }}
              </strong>
            </template>
          </v-data-table>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
type ITableHeader = { title?: string, value?: string }

import useConditionalItem from "../composables/useConditionalItem";
import useWebSocket from "../composables/useWebSocket";
import usePriceNormalizer from "../composables/usePriceNormalizer";
import {useOrderStore} from "../stores/OrderStore";
import {computed, onMounted} from "vue";
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
const orderStore = useOrderStore()

const coin = computed(() => orderStore.currentSymbol.toLowerCase())
const asks = computed(() => orderStore.orders.flatMap(el => el.a).filter(([price, quantity]) => quantity))
const bids = computed(() => orderStore.orders.flatMap(el => el.b).filter(([price, quantity]) => quantity))

const headers = computed<ITableHeader[]>(() => [
  {title: 'Price', value: 'price'},
  {title: 'Quantity', value: 'quantity'},
  useConditionalItem({title: 'Total', value: 'total'}, !mobile.value)
])

const itemsPerPageOptions = [
  {value: 100, title: '100'},
  {value: 500, title: '500'},
  {value: 1000, title: '1000'}
]

onMounted(() => {
  useWebSocket(coin.value, orderStore.setOrder)
  orderStore.getData()
})
</script>

<style scoped></style>
