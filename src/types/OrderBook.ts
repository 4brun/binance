export type OrderBook = {
  lastUpdateId: number
  bids: Map<string, string>
  asks: Map<string, string>
}
