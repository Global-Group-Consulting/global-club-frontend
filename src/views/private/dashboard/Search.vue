<template>
  <div class="logo-container"></div>
  <div class="search-container">
    <div v-if="options.length">
      <AutoComplete :options="options" :optionsKey="optionsKey" />
    </div>
    <btn
      class="filter"
      @click="setOpen(true, $event)"
      fill="clear"
      size="small"
      shape="round"
      slot="icon-only"
      icon-name="filter"
    ></btn>
  </div>
</template>
<script lang="ts">
import { ProductCategoryApis } from "@/plugins/httpCalls/ProductCategoryApis";
import { defineComponent, inject, onMounted, ref } from "vue";
import AutoComplete from "../../../components/AutoComplete.vue";
import { ProductCategory } from "@/@types/ProductCategory";
import { AlertsPlugin } from "@/plugins/Alerts";

export default defineComponent({
  name: "Search",
  components: { AutoComplete },
  setup() {
    const alerts: AlertsPlugin = inject<AlertsPlugin>("alerts") as AlertsPlugin;

    const options = ref<ProductCategory[]>([]);
    const optionsKey = ref("title");
    const selected = ref({});
    const isOpenRef = ref(false);
    const event = ref();

    const getData = async () => {
      try {
        await ProductCategoryApis?.readAll().then((resp) => {
          options.value = (resp as never[]) ?? [];
        });
      } catch (error) {
        alerts.error(error);
      }
    };
    onMounted(async () => {
      getData();
    });
    const setOpen = (state: boolean, ev?: Event) => {
      event.value = ev;
      isOpenRef.value = state;
    };

    return {
      options,
      selected,
      optionsKey,
      isOpenRef,
      setOpen,
    };
  },
});
</script>

<style>
</style>
