<template>
  <PaginatedList :paginated-data="paginatedData"
                 v-if="paginatedData?.data.length > 0"
                 v-slot:default="{data}"
                 @pageChanged="onPageChanged">
    <ion-list>
      <MovementListItem v-for="movement in data" :key="movement._id"
                        :show-semester="showSemester"
                        :movement="movement"
                        @movement:removed="onMovementRemoved"></MovementListItem>
    </ion-list>
  </PaginatedList>
  <!--  <ion-list v-if="movementsList?.length > 0">
      <MovementListItem v-for="movement in movementsList" :key="movement._id"
                        :show-semester="showSemester"
                        :movement="movement"></MovementListItem>
    </ion-list>

    <NoData v-else/>

    <PaginationBar :pagination-data="paginationData"></PaginationBar>-->
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref, Ref, watch } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { Movement } from '@/@types/Movement'
import { PaginatedResult } from '@/@types/Pagination'
import MovementListItem from '@/components/lists/movements/MovementListItem.vue'
import PaginatedList from '@/components/lists/PaginatedList.vue'

export default defineComponent({
  name: 'MovementsList',
  components: { PaginatedList, MovementListItem },
  props: {
    userId: {
      type: String,
      required: true
    },
    semesterId: String,
    showSemester: Boolean,
    onlyFast: Boolean,
    waitBeforeFetch: Boolean
  },
  setup (props, { emit }) {
    const http = inject<HttpPlugin>('http') as HttpPlugin
    const movementsList: Ref<Movement[] | null> = ref(null)
    // const paginationData: Ref<PaginationData> = ref(new PaginationData())
    const paginatedData: Ref<PaginatedResult | undefined> = ref()

    async function fetchData (page = 1, semesterId?: string) {
      paginatedData.value = await http.api.movements.readAll(props.userId, semesterId, page.toString(), props.onlyFast)
    }

    function onPageChanged (page: number) {
      fetchData(page, props.semesterId)
      // paginatedData.value = await http.api.movements.readAll(props.userId, undefined, page.toString());
    }

    watch(() => props.userId, (userId: string) => {
      if (!userId) {
        return
      }

      fetchData()
    })

    watch(() => props.semesterId, semesterId => {
      const isSemester: boolean = !!semesterId && !!semesterId.match(/^[0-9]{4}_[1,2]{1}$/)

      fetchData(1, isSemester ? semesterId : undefined)
    })

    onMounted(() => {
      if (!props.waitBeforeFetch) {
        fetchData(1, props.semesterId ? props.semesterId : undefined)
      }
    })

    function onMovementRemoved () {
      fetchData(paginatedData.value?.page, props.semesterId ?? undefined)
      emit('data:fetched')
    }

    function refreshData () {
      fetchData(paginatedData.value?.page, props.semesterId ?? undefined)
    }

    return {
      movementsList,
      paginatedData, onPageChanged,
      onMovementRemoved,
      refreshData
    }
  }
})
</script>

<style scoped>

</style>
