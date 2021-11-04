<template>
  <ion-grid v-if="paginationData.totalPages > 1">
    <ion-button @click="prevPage" :disabled="!canGoBack" shape="round" size="small">
      <Icon name="chevron-left" slot="icon-only"></Icon>
    </ion-button>

    <ion-button disabled color="transparent" style="color: white">
      {{ paginationData.page }} / {{ paginationData.totalPages }}
    </ion-button>

    <!--
      <ion-button shape="round" v-for="(page, i) in pagesList" :key="i">
          {{ page }}
      </ion-button>
    -->

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

      /* const pagesList = computed(() => {
         const pagesEmptyArray = Array(props.paginationData?.totalPages).fill(0);
         const startFrom = page.value - 1;
         const firstPages = pagesEmptyArray.slice(startFrom, startFrom + props.beforeNumPages).map((fakeNum, i) => i + 1 + startFrom)
         const lastPages = pagesEmptyArray.slice(pagesEmptyArray.length - props.afterNumPages).map((fakeNum, i) => (pagesEmptyArray.length - props.afterNumPages) + (i + 1))

         const toReturn: (string | number)[] = []

         if (startFrom > 1) {
           toReturn.push("...")
         }

         toReturn.push(...firstPages)

         if (props.paginationData.totalPages - props.afterNumPages > page.value) {
           toReturn.push("...")
         }

         toReturn.push(...lastPages)

         return toReturn
       })*/

      async function nextPage () {
        page.value++
      }

      async function prevPage () {
        page.value--
      }

      watch(page, async () => {
        emit("pageChanged", page.value)
      })

      return {
        canGoBack, canGoForward,
        nextPage, prevPage,
      }
    }
  })
</script>

<style scoped>

</style>
