import {defineStore} from 'pinia'
import {ref} from "vue";
import type DepthStream from "../types/DepthStream";
import type Snapshot from "../types/Snapshot";
import {OrderBook} from "../types/OrderBook";

export const useOrderStore = defineStore('OrderStore', () => {
  const symbolList = ['BTCUSDT', 'BNBBTC', 'ETHBTC']
  const currentSymbol = ref('BTCUSDT')
  const orderBook = ref<OrderBook>()

  async function getSnapshot() {
    await fetch(`https://api.binance.com/api/v3/depth?symbol=${currentSymbol.value}&limit=1000`)
      .then(async (res) => {
        if (res.ok) {
          return await res.json() as Snapshot
        }
      }).then(data => {
        orderBook.value = createOrderBook(data)
      })
  }

  function createOrderBook(snapshot: Snapshot): OrderBook {
    return {
      lastUpdateId: snapshot.lastUpdateId,
      bids: new Map(snapshot.bids),
      asks: new Map(snapshot.asks),
    }
  }

  function processEvent(event: DepthStream) {
    if (event.u <= orderBook.value.lastUpdateId) {
      console.log(1)
      return
    }
    if (event.U <= orderBook.value.lastUpdateId + 1 && event.u >= orderBook.value.lastUpdateId + 1) {
      console.log(2)
      updateOrderBook(event)
    } else if (event.U === orderBook.value.lastUpdateId + 1) {
      console.log(3)
      updateOrderBook(event)
    }
  }

  function updateOrderBook(event: DepthStream) {
    const newOrderBook = {...orderBook.value, lastUpdateId: event.u}

    for (const [price, quantity] of event.b) {
      if (quantity === '0.00000000') {
        newOrderBook.bids.delete(price);
      } else {
        newOrderBook.bids.set(price, quantity);
      }
    }

    for (const [price, quantity] of event.a) {
      if (quantity === '0.00000000') {
        newOrderBook.asks.delete(price);
      } else {
        newOrderBook.asks.set(price, quantity);
      }
    }

    orderBook.value = newOrderBook
  }

  return {symbolList, currentSymbol, getSnapshot, orderBook, processEvent}
})
