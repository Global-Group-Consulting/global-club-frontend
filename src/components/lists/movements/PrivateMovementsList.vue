<template>
  <ion-list v-if="movementsList?.length > 0">
    <MovementListItem v-for="movement in movementsList" :key="movement._id"
                      :movement="movement"></MovementListItem>
  </ion-list>

  <NoData v-else/>
</template>

<script lang="ts">
  import { defineComponent, inject, onMounted, ref, Ref } from 'vue';
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
      semester: String
    },
    setup (props) {
      const http = inject<HttpPlugin>('http') as HttpPlugin;
      const movementsList: Ref<Movement[] | null> = ref(null)

      onMounted(async () => {
        const data = await http.api.movements.readAll(props.userId);

        if (data) {
          movementsList.value = data.data;
        }
      })

      return {
        http, movementsList
      }
    }
  });
</script>

<style scoped>

</style>
