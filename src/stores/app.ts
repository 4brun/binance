import {defineStore} from 'pinia'
import {ref} from "vue";

export const useAppStore = defineStore('app', () => {
  const symbolList = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
  const currentSymbol = ref('BTCUSDT')
  const ordersFromStream = ref<DepthStream[]>([])
  const orders = ref<DepthStream[]>([])

  const bids = ref<[string, string][]>([])
  const asks = ref<[string, string][]>([])
  const lastUpdateId = ref(0)


  async function getData() {
    await fetch(`https://api.binance.com/api/v3/depth?symbol=${currentSymbol.value}&limit=1000`)
      .then(async (res) => {
        if (res.ok) {
          return await res.json() as Snapshot
        }
      }).then(data => {
        bids.value = data.bids
        asks.value = data.asks
        lastUpdateId.value = data.lastUpdateId
      })
  }

  return {symbolList, currentSymbol, getData, lastUpdateId, ordersFromStream, orders}
})
