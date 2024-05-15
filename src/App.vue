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
  if (order.a && order.a[0][1] === '0') {
    order.a[0][0] = '0'
  }
  if (order.b && order.b[0][1] === '0') {
    order.b[0][0] = '0'
  }
  console.log(order.U <= appStore.lastUpdateId + 1 && order.u >= appStore.lastUpdateId + 1)
  if (order.U <= appStore.lastUpdateId + 1 && order.u >= appStore.lastUpdateId + 1 && !appStore.orders.length) {
    appStore.orders.push(order)
  } else if (order.U + 1 === appStore.orders[appStore.orders.length - 1]?.u) {
    appStore.orders.push(order)
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
