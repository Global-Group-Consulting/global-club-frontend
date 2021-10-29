<template>
  <ion-grid>
    <ion-button @click="prevPage">Prev</ion-button>
    <ion-button @click="nextPage">Next</ion-button>
  </ion-grid>
</template>

<script lang="ts">
  import { defineComponent, defineProps, Ref, ref, watch } from 'vue';

  export default defineComponent({
    name: "PaginationBar",
    props: {
      fetchFn: {
        type: Function,
        required: true
      }
    },
    setup (props) {
      const page: Ref<number> = ref(1);

      async function nextPage () {
        page.value++
      }

      async function prevPage () {
        page.value--
      }

      watch(page, async () => {
        await props.fetchFn(page.value)
      })

      return { nextPage, prevPage }
    }
  })
</script>

<style scoped>

</style>
