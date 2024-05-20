import {onUnmounted, ref} from 'vue'
import DepthStream from "../types/DepthStream";

export default function useWebSocket(coin: string, cb: (data: any) => void) {
  const socket = ref<WebSocket>()
  socket.value = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@depth`)
  console.log('[WebSocket] Open')
  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data) as DepthStream
    const convertedData = JSON.parse(event.data) as DepthStream<number[][]>
    convertedData.b = data.b.map(([price, quantity]) => [parseFloat(price), parseFloat(quantity)]);
    convertedData.a = data.a.map(([price, quantity]) => [parseFloat(price), parseFloat(quantity)]);
    cb(convertedData)
  }

  onUnmounted(() => {
    console.log('[WebSocket] Closed')
    socket.value.close()
  })

  return {socket}
}
