export default function usePriceNormalizer(value = 0) {
  if (value && isNaN(value)) {
    return value
  }
  return Intl.NumberFormat('ru-RU', {
    maximumFractionDigits: 5,
  }).format(value)
}
