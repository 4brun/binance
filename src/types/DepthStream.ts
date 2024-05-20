export default interface DepthStream<T = string[][]> {
  e: string   // Event type
  E: number   // Event time
  s: string   // Symbol
  U: number   // First update ID in event
  u: number   // Final update ID in event
  b: T        // Bids to be updated
  a: T        // Asks to be updated
}
