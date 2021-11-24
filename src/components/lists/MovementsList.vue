<template>
  <ion-list v-if="movementsList?.length > 0">
    <MovementListItem v-for="movement in movementsList" :key="movement._id"
                      :movement="movement"></MovementListItem>
  </ion-list>

  <NoData v-else/>

  <PaginationBar :pagination-data="paginationData"></PaginationBar>
</template>

<script lang="ts">
  import { defineComponent, inject, ref, Ref, watch } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Movement } from '@/@types/Movement';
  import { PaginatedResult } from '@/@types/Pagination';
  import { PaginatedResultData, PaginationData } from '@/@entities/pagination.entity';
  import PaginationBar from '@/components/PaginationBar.vue';
  import MovementListItem from '@/components/lists/movements/MovementListItem.vue';
  import NoData from '@/components/NoData.vue';

  export default defineComponent({
    name: "MovementsList",
    components: { NoData, MovementListItem, PaginationBar },
    props: {
      userId: {
        type: String,
        required: true
      }
    },
    setup (props) {
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      const movementsList: Ref<Movement[] | null> = ref(null)
      const paginationData: Ref<PaginationData> = ref(new PaginationData())

      watch(() => props.userId, async (userId: string) => {
        if (!userId) {
          return
        }

        const apiCalls: any[] = [
          http.api.movements.readAll(userId)
        ]

        const results = await Promise.all<PaginatedResult<Movement[]>>(apiCalls);
        const paginatedResult = new PaginatedResultData(results[0])

        movementsList.value = paginatedResult.data
        paginationData.value = paginatedResult.paginationData;

      }, { immediate: true });

      return {
        movementsList,
        paginationData,
      }
    }
  });
</script>

<style scoped>

</style>
