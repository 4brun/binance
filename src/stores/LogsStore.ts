import {defineStore, storeToRefs} from "pinia";
import {onMounted, ref, watch} from "vue";
import LogItem from "../types/LogItem";
import {useOrderStore} from "./OrderStore";
import useGetRandomID from "../composables/useGetRandomID";
import useGetDate from "../composables/useGetDate";

export const useLogsStore = defineStore('LogsStore', () => {
  const orderStore = useOrderStore()
  const {currentSymbol} = storeToRefs(orderStore)
  const logs = ref<LogItem[]>([])

  function genLogItem(name: string, oldName?: string) {
    const newItem: LogItem = {id: useGetRandomID(), name, oldName, date: useGetDate()}
    return newItem
  }

  watch(currentSymbol, (val, oldVal) => {
    const newItem = genLogItem(val, oldVal)
    logs.value.push(newItem)
  })

  onMounted(() => {
    logs.value = [genLogItem(currentSymbol.value)]
  })

  return {
    logs
  }
})
