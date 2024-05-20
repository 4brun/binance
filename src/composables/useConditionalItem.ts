export default function useConditionalItem<T>(item: T, condition?: boolean) {
  return condition ? item : {}
}
