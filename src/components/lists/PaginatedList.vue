<template>
  <div v-if="paginatedResultData?.data.length > 0">
    <ion-refresher slot="fixed" @ionRefresh="$emit('manualRefresh',$event)"
                   v-if="visible">
      <ion-refresher-content></ion-refresher-content>
    </ion-refresher>

    <slot :data="paginatedResultData?.data">

    </slot>

    <PaginationBar :pagination-data="paginatedResultData?.paginationData"
                   @pageChanged="$emit('pageChanged', $event)"></PaginationBar>
  </div>

  <NoData v-else></NoData>
</template>

<script lang="ts">
import {defineComponent, PropType, Ref, ref, watch} from 'vue';
import PaginationBar from "@/components/PaginationBar.vue";
import {PaginatedResultData} from "@/@entities/pagination.entity";
import {PaginatedResult} from "@/@types/Pagination";
import NoData from "@/components/NoData.vue";

export default defineComponent({
  name: "PaginatedList",
  components: {NoData, PaginationBar},
  props: {
    paginatedData: Object as PropType<PaginatedResult>,
    visible: Boolean
  },
  setup(props) {
    const paginatedResultData: Ref<PaginatedResultData | undefined> = ref();

    watch(() => props.paginatedData, (value: PaginatedResult | undefined) => {
      paginatedResultData.value = value ? new PaginatedResultData(value) : undefined;
    }, {immediate: true, deep: true})

    return {
      paginatedResultData
    }
  }
});
</script>

<style scoped>

</style>
