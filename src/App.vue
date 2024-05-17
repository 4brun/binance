<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import {useAppStore} from "./stores/app";
import {computed, onMounted} from "vue";

const appStore = useAppStore()
const coin = computed(() => appStore.currentSymbol.toLowerCase())

function setOrder(order: DepthStream) {
  if (order.u <= appStore.lastUpdateId) {
    return
  }
  // If the quantity is 0, remove the price level.
  if (order.a && order.a[0][1] === '0') {
    order.a[0][0] = '0'
  }
  if (order.b && order.b[0][1] === '0') {
    order.b[0][0] = '0'
  }
  // The first processed event should have U <= lastUpdateId+1 AND u >= lastUpdateId+1
  if (order.U <= appStore.lastUpdateId + 1 && order.u >= appStore.lastUpdateId + 1 && !appStore.orders.length) {
    appStore.orders = [order]
  }
  // While listening to the stream, each new event's U should be equal to the previous event's u+1.
  else if (order.U === appStore.orders[appStore.orders.length - 1]?.u + 1) {
    appStore.orders = [order]
  }
}

onMounted(() => {
  const socket = new WebSocket(`wss://stream.binance.com:9443/ws/${coin.value}@depth`);
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data) as DepthStream
    appStore.ordersFromStream.push(data)
    setOrder(data)
  }
})
</script>
