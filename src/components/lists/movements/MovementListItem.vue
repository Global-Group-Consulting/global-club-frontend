<template>
  <ion-item>
    <ion-thumbnail slot="start" class="center-inner-icon">
      <Icon :name="icon" :color="color" size="large"></Icon>
    </ion-thumbnail>

    <ion-label>
      <h2>
        <strong> {{ type === "in" ? "+" : "-" }} {{ formatBrites(movement.amountChange) }}</strong>
        <BriteIcon class="ms-1"></BriteIcon>
      </h2>
      <h4>{{ formatMovementType(movement.movementType) }}</h4>
    </ion-label>

    <ion-label slot="end">
      <small>{{ formatLocaleDate(movement.created_at) }}</small>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, PropType } from 'vue';
  import { Movement } from '@/@types/Movement';
  import { MovementTypeInList, MovementTypeOutList } from '@/@enums/movement.type.enum';
  import { formatMovementType } from '@/@utilities/statuses';
  import { formatBrites, formatCurrency } from '@/@utilities/currency';
  import { formatLocaleDate } from '@/@utilities/dates';
  import BriteIcon from '@/components/BriteIcon.vue';

  export default defineComponent({
    name: "MovementListItem",
    components: { BriteIcon },
    props: {
      movement: {
        type: Object as PropType<Movement>,
        required: true
      }
    },
    setup (props) {
      const type: ComputedRef<"in" | "out" | null> = computed(() => {
        if (MovementTypeOutList.includes(props.movement.movementType)) {
          return "out"
        } else if (MovementTypeInList.includes(props.movement.movementType)) {
          return "in"
        }

        return null
      })

      const icon = computed(() => {
        return type.value
      })

      const color = computed(() => {
        if (type.value === "out") {
          return "red"
        } else {
          return "green"
        }
      })

      return {
        type, icon, color,
        formatMovementType,
        formatBrites, formatCurrency, formatLocaleDate
      }
    }
  });
</script>


<style scoped lang="scss">

</style>
