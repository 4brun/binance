<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-sheet class="ma-1 pa-1" rounded>
          <span class="text-h6 px-2">Bids
            <small class="text-disabled">
            ({{ orderStore.currentSymbol }})
            </small>
          </span>
          <v-divider/>
          <v-data-table
            :headers="headers"
            fixed-header
            fixed-footer
            :loading="orderStore.loader"
            :height="`calc(${mobile ? 50 : 100}vh - ${mobile ? 14 : 16}rem)`"
            density="compact"
            :items="bids"
            items-per-page="100"
            :items-per-page-options="itemsPerPageOptions"
          >
            <template #item.price="{item}">
              {{ item[0] }}
            </template>
            <template #item.quantity="{item}">
              {{ item[1] }}
            </template>
            <template #item.total="{item}">
              <strong>
                {{ item[0] * item[1] }}
              </strong>
            </template>
          </v-data-table>
        </v-sheet>
      </v-col>

      <v-col cols="12" md="6">
        <v-sheet class="ma-1 pa-1" rounded>
          <span class="text-h6 px-2">Asks
            <small class="text-disabled">
            ({{ orderStore.currentSymbol }})
            </small>
          </span>
          <v-divider/>
          <v-data-table
            :headers="headers"
            fixed-header
            fixed-footer
            :loading="orderStore.loader"
            :height="`calc(${mobile ? 50 : 100}vh - ${mobile ? 14 : 16}rem)`"
            density="compact"
            :items="asks"
            items-per-page="100"
            :items-per-page-options="itemsPerPageOptions"
          >
            <template #item.price="{item}">
              {{ item[0] }}
            </template>
            <template #item.quantity="{item}">
              {{ item[1] }}
            </template>
            <template #item.total="{item}">
              {{ item[0] * item[1] }}
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
import {useOrderStore} from "../stores/OrderStore";
import {computed, onMounted} from "vue";
import {useDisplay} from "vuetify";

const {mobile} = useDisplay()
const orderStore = useOrderStore()

const coin = computed(() => orderStore.currentSymbol.toLowerCase())
const bids = computed(() => convertToArray(orderStore.orderBook?.bids))
const asks = computed(() => convertToArray(orderStore.orderBook?.asks))

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

function convertToArray(mapCollection?: Map<string, string>) {
  if (!mapCollection) {
    return
  }
  return [...mapCollection].map(([key, value]) => [key, value])
}

onMounted(() => {
  const {socket} = useWebSocket(coin.value, orderStore.processEvent)

  socket.value.onopen = async () => {
    console.warn('[WebSocket] Open')
    await orderStore.getSnapshot()
  }
})
</script>

<style scoped></style>
