<template>
  <ion-grid v-if="paginationData.totalPages > 1" class="ion-text-center">
    <ion-button @click="prevPage" :disabled="!canGoBack" shape="round" size="small">
      <Icon name="chevron-left" slot="icon-only"></Icon>
    </ion-button>

    <ion-button disabled color="transparent" style="color: white">
      {{ paginationData.page }} / {{ paginationData.totalPages }}
    </ion-button>

    <ion-button @click="nextPage" :disabled="!canGoForward" shape="round" size="small">
      <Icon name="chevron-right" slot="icon-only"></Icon>
    </ion-button>
  </ion-grid>
</template>

<script lang="ts">
  import { computed, defineComponent, Ref, ref, watch } from 'vue';
  import { PaginatedResult } from '@/@types/Pagination';
  import Icon from "@/components/Icon.vue"

  interface SetupContext {
    emit: (e: "pageChanged", newPage: number) => void;
  }

  export default defineComponent({
    name: "PaginationBar",
    components: { Icon },
    props: {
      paginationData: {
        type: Object as () => Omit<PaginatedResult, "data">,
        default: () => ({
          totalPages: 0,
          totalItems: 0,
          page: 1,
          perPage: 0,
          sortBy: [],
          order: "ASC",
        })
      },
      beforeNumPages: { type: Number, default: 2 },
      afterNumPages: { type: Number, default: 2 },
    },
    setup (props, { emit }: SetupContext) {
      const page: Ref<number> = ref(props.paginationData.page ?? 1);

      const canGoBack = computed(() => page.value > 1);
      const canGoForward = computed(() => page.value < props.paginationData.totalPages);

      async function nextPage () {
        page.value++
      }

      async function prevPage() {
        page.value--
      }

      watch(page, async () => {
        emit("pageChanged", page.value)
      })

      watch(() => props.paginationData, (value: Omit<PaginatedResult, "data"> | undefined) => {
        page.value = value?.page ?? 1
      }, {deep: true})

      return {
        canGoBack, canGoForward,
        nextPage, prevPage,
      }
    }
  })
</script>

<style scoped>

</style>
