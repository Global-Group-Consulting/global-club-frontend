<template>
  <Tooltip :tooltip="getTooltip()">
    <ion-button class="semester-chip" shape="round" :color="type"
                :class="version"
                :size="version !== 'main' ? 'small' : 'default'"
                @click="$emit('click', $event)">
      <i class='gc-icon-brite-logo me-2' slot='start'/>

      {{ formattedValue }}
    </ion-button>
  </Tooltip>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import { formatBrites } from '@/@utilities/currency'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import { formatLocaleDate } from '@/@utilities/dates'
import Tooltip from '@/components/Tooltip.vue'
import { MovementTypeEnum } from '@/@enums/movement.type.enum'

export default defineComponent({
  name: 'WalletPremiumChip',
  components: { Tooltip },
  emits: ['click'],
  props: {
    value: {
      type: Number,
      required: true
    },
    type: {
      type: String as PropType<'primary' | 'secondary'>
    },
    version: {
      // Change color of text based on it
      type: String as PropType<'main' | 'lost' | 'past' | 'present' | 'future'>
    },
    movementData: {
      type: Object as PropType<WalletPremiumMovement>,
      required: true
    }
  },
  setup (props, { emit }) {

    const formattedValue = computed(() => {
      return formatBrites(props.value, 'start', true)
    })

    function getTooltip () {
      let toReturn = ''

      switch (props.version) {
        case 'main':
          toReturn = 'Brite scaduti il ' + formatLocaleDate(new Date(props.movementData.referenceUsableUntil), true)
          break
        case 'future':
          toReturn = 'Brite non ancora sbloccabili'
          break
        case 'past':
          toReturn = 'Brite sbloccati in data ' + (props.movementData.withdrawalDate ? formatLocaleDate(new Date(props.movementData.withdrawalDate)) : '')

          if (props.movementData?.withdrawalMovements) {
            const lastMovement = props.movementData.withdrawalMovements[0]

            if (lastMovement.movementType === MovementTypeEnum.DEPOSIT_RECEIVED_WP) {
              toReturn += "<br>" + lastMovement.notes.replace("Wallet Premium - ", "").trim()
            }
          }
          break
        case 'lost':
          toReturn = 'Brite non più sbloccabili'
          break
        case 'present':
          toReturn = 'Brite sbloccabili entro il ' + (props.movementData.withdrawableUntil ? formatLocaleDate(new Date(props.movementData.withdrawableUntil), true) : '') +
              '<br>Fai click per sbloccarli'
          break
      }

      return toReturn
    }

    return {
      formattedValue,
      getTooltip
    }
  }
})
</script>

<style scoped lang="scss">
ion-button.ion-color-secondary::part(native) {
  color: inherit;
}

.semester-chip {
  min-width: 120px;
  margin: 0 !important;

  &.lost {
    --ion-color-base: var(--ion-color-secondary) !important;
    color: #808080 !important;
  }

  &.past {
    --ion-color-base: var(--ion-color-secondary) !important;
    color: var(--ion-color-primary) !important;
  }

  &.present {
    --ion-color-base: var(--primary-dark-bg-gradient) !important;
    color: white;
  }

  &.future {
    --ion-color-base: var(--ion-color-primary) !important;
  }
}
</style>
