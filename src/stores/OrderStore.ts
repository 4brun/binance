import {defineStore} from 'pinia'
import {ref} from "vue";
import type DepthStream from "../types/DepthStream";
import type Snapshot from "../types/Snapshot";

export const useOrderStore = defineStore('OrderStore', () => {
  const symbolList = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
  const currentSymbol = ref('BTCUSDT')
  const orders = ref<DepthStream<number[][]>[]>([])
  const lastUpdateId = ref(0)

  async function getData() {
    await fetch(`https://api.binance.com/api/v3/depth?symbol=${currentSymbol.value}&limit=1000`)
      .then(async (res) => {
        if (res.ok) {
          return await res.json() as Snapshot
        }
      }).then(data => {
        lastUpdateId.value = data.lastUpdateId
      })
  }

  function setOrder(order: DepthStream<number[][]>) {
    if (order.u <= lastUpdateId.value) {
      return
    }
    // The first processed event should have U <= lastUpdateId+1 AND u >= lastUpdateId+1
    if (order.U <= lastUpdateId.value + 1 && order.u >= lastUpdateId.value + 1 && !orders.value.length) {
      orders.value.push(order)
    }
    // While listening to the stream, each new event's U should be equal to the previous event's u+1.
    else if (order.U === orders.value[orders.value.length - 1]?.u + 1) {
      orders.value.push(order)
    }
  }

  return {symbolList, currentSymbol, getData, lastUpdateId, orders, setOrder}
})
