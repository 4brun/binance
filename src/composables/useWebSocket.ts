import {onUnmounted, ref} from 'vue'
import DepthStream from "../types/DepthStream";

export default function useWebSocket(coin: string, cb: (event: DepthStream) => void) {
  const socket = ref<WebSocket>()
  socket.value = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@depth`)

  socket.value.onopen = () => {
    console.log('[WebSocket] Open')
  }

  socket.value.onmessage = (event) => {
    const data = JSON.parse(event.data) as DepthStream
    cb(data)
  }

  onUnmounted(() => {
    console.log('[WebSocket] Closed')
    socket.value.close()
  })

  return {socket}
}
