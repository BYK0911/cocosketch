
import { reactive, watch } from "vue";
import { GraphData } from "@/views/sketch/graph";

const store = reactive<{
  pics: GraphData[];
}>({
  pics: localStorage.sketch ? JSON.parse(localStorage.sketch).pics : []
})

watch(store, () => localStorage.sketch = JSON.stringify(store))

export default store