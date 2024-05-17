interface DepthStream {
  e: string   // Event type
  E: number   // Event time
  s: string   // Symbol
  U: number   // First update ID in event
  u: number   // Final update ID in event
  b: [string, string][]    // Bids to be updated
  a: [string, string][]    // Asks to be updated
}
