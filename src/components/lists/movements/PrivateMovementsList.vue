<template>
  <ion-list v-if="movementsList?.length > 0">
    <MovementListItem v-for="movement in movementsList" :key="movement._id"
                      :movement="movement"></MovementListItem>
  </ion-list>

  <NoData v-else/>
</template>

<script lang="ts">
  import { defineComponent, inject, onMounted, ref, Ref, watch } from 'vue';
  import NoData from '@/components/NoData.vue';
  import MovementListItem from '@/components/lists/movements/MovementListItem.vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { Movement } from '@/@types/Movement';

  export default defineComponent({
    name: "PrivateMovementsList",
    components: { MovementListItem, NoData },
    props: {
      userId: {
        type: String,
        required: true
      },
      semester: String,
      visible: {
        type: Boolean,
        default: true
      },
    },
    setup (props, { emit }) {
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      const movementsList: Ref<Movement[] | null> = ref(null)
      const loaded = ref(false);

      async function fetchData () {
        const semester = props.semester === "resoconto" ? undefined : props.semester;
        const data = await http.api.movements.readAll(props.userId, semester);

        if (data) {
          movementsList.value = data.data;
        }

        loaded.value = true

        emit("dataFetched")
      }

      watch(() => props.visible, (value) => {
        if (!loaded.value && value) {
          fetchData()
        }
      })

      onMounted(async () => {
        if (!loaded.value && props.visible) {
          await fetchData()
        }
      });

      return {
        http, movementsList
      }
    }
  });
</script>

<style scoped>

</style>
