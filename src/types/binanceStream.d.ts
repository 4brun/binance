interface BinanceStream {
  e: string   // Event type
  E: number   // Event time
  s: string   // Symbol
  p: string   // Price change
  P: string   // Price change percent
  o: string   // Open price
  h: string   // High price
  l: string   // Low price
  c: string   // Last price
  w: string   // Weighted average price
  v: string   // Total traded base asset volume
  q: string   // Total traded quote asset volume
  O: number   // Statistics open time
  C: number   // Statistics close time
  F: number   // First trade ID
  L: number   // Last trade Id
  n: number   // Total number of trades
}
