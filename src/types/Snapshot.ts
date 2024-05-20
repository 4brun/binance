export default interface Snapshot {
  lastUpdateId: number
  bids: [string, string][]
  asks: [string, string][]
}
