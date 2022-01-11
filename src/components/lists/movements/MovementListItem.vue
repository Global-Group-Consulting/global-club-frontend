<template>
  <ion-item>
    <ion-thumbnail slot="start" class="center-inner-icon" v-if="$store.getters['mdAndUp']">
      <Icon :name="icon" :color="color" size="large"></Icon>
    </ion-thumbnail>

    <ion-label >
      <h2 :style="`color: ${color}`"><strong v-html="value"></strong></h2>
      <h4>{{ formatMovementType(movement.movementType) }}</h4>
    </ion-label>

    <ion-label slot="end">
      <div class="d-flex flex-column ion-align-items-center">
        <ion-chip :color="movementColor" >{{ movementPack }}</ion-chip>
        <small>{{ formatLocaleDate(movement.createdAt) }}</small>
      </div>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, PropType } from 'vue';
  import { Movement } from '@/@types/Movement';
  import { MovementTypeInList, MovementTypeOutList } from '@/@enums/movement.type.enum';
  import { formatClubPack, formatMovementType } from '@/@utilities/statuses';
  import { formatBrites, formatCurrency } from '@/@utilities/currency';
  import { formatLocaleDate } from '@/@utilities/dates';

  export default defineComponent({
    name: "MovementListItem",
    components: { },
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
          return "var(--ion-color-danger)"
        } else {
          return "var(--ion-color-success)"
        }
      })

      const value = computed(() => {
        return (type.value === 'in' ? '+' : '-') + " " + formatBrites(props.movement.amountChange)
      })

      const movementColor = computed(() => {
        return "primary"
      })

      const movementPack = computed(() => {
        return formatClubPack(props.movement.clubPack) || "Sconosciuto"
      })

      return {
        type, icon, color, value, movementColor,
        movementPack,
        formatMovementType,
        formatBrites, formatCurrency, formatLocaleDate
      }
    }
  });
</script>


<style scoped lang="scss">

</style>
