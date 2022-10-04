<template>
  <ion-item>
    <ion-thumbnail slot="start" class="center-inner-icon" v-if="$store.getters['mdAndUp']">
      <Icon :name="icon" :color="color" size="large"></Icon>
    </ion-thumbnail>

    <ion-label>
      <h2 :style="`color: ${color}`"><strong v-html="value"></strong></h2>
      <h4>{{ formatMovementType(movement.movementType) }}</h4>
      <small class="ion-text-wrap"
             v-if="showDetailsLabel">
        Dettagli: {{ movement.notes }}
      </small>
    </ion-label>

    <ion-label slot="end">
      <div class="d-flex flex-column ion-align-items-end">
        <div class="ion-nowrap">
          <ion-chip :color="movementColor">{{ movementPack }}</ion-chip>
          <ion-chip class="small" disabled v-if="showSemester">{{ movement.semesterId.replace('_', '-') }}</ion-chip>
        </div>
        <small>{{ formatLocaleDate(movement.createdAt) }}</small>
      </div>
    </ion-label>
    <ion-label slot="end" v-if="$store.getters['auth/isSuperAdmin']">
      <ClubButton only-icon icon version="link" icon-name="menu-v" @click="setOpen(true, $event)"></ClubButton>
      <ion-popover
          :is-open="isOpenRef"
          css-class="my-custom-class"
          :event="event"
          :translucent="true"
          :show-backdrop="false"
          @didDismiss="setOpen(false)"
      >
        <ion-list>
          <ion-item button @click="onChangeMovementPackClick">
            <ion-label>Cambia Pack Movimento</ion-label>
          </ion-item>
          <ion-item button @click="onRemoveMovementClick" v-if="isDeletable">
            <ion-label>Rimuovi movimento</ion-label>
          </ion-item>
        </ion-list>
      </ion-popover>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, PropType, ref } from 'vue'
import { Movement } from '@/@types/Movement'
import { MovementTypeEnum, MovementTypeInList, MovementTypeOutList } from '@/@enums/movement.type.enum'
import { formatClubPack, formatMovementType } from '@/@utilities/statuses'
import { formatBrites, formatCurrency } from '@/@utilities/currency'
import { formatLocaleDate } from '@/@utilities/dates'
import Icon from '@/components/Icon.vue'
import ClubButton from '@/components/ClubButton.vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { useI18n } from 'vue-i18n'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { PackEnum } from '@/@enums/pack.enum'

export default defineComponent({
  name: 'MovementListItem',
  components: { ClubButton, Icon },
  props: {
    movement: {
      type: Object as PropType<Movement>,
      required: true
    },
    showSemester: Boolean
  },
  setup (props, { emit }) {
    const isOpenRef = ref(false)
    const event = ref()
    const alerts = inject('alerts') as AlertsPlugin
    const http = inject('http') as HttpPlugin
    const { t } = useI18n()
    const type: ComputedRef<'in' | 'out' | null> = computed(() => {
      if (MovementTypeOutList.includes(props.movement.movementType)) {
        return 'out'
      } else if (MovementTypeInList.includes(props.movement.movementType)) {
        return 'in'
      }

      return null
    })

    const icon = computed(() => {
      return type.value
    })

    const color = computed(() => {
      if (type.value === 'out') {
        return 'var(--ion-color-danger)'
      } else {
        return 'var(--ion-color-success)'
      }
    })

    const value = computed(() => {
      return (type.value === 'in' ? '+' : '-') + ' ' + formatBrites(props.movement.amountChange)
    })

    const movementColor = computed(() => {
      return 'primary'
    })

    const movementPack = computed(() => {
      return formatClubPack(props.movement.clubPack) || 'Sconosciuto'
    })

    const isDeletable = computed(() => {
      return [MovementTypeEnum.DEPOSIT_ADDED, MovementTypeEnum.DEPOSIT_REMOVED, MovementTypeEnum.DEPOSIT_USED].includes(props.movement.movementType)
    })

    const showDetailsLabel = computed(() => {
      if (!props.movement.notes) {
        return false
      }

      return (props.movement.notes && props.movement.notes !== formatMovementType(props.movement.movementType))
    })

    function setOpen (state: boolean, ev?: Event) {
      event.value = ev
      isOpenRef.value = state
    }

    async function onRemoveMovementClick () {
      isOpenRef.value = false

      const res = await alerts.ask({
        header: t('alerts.movements.deleteMovement.title'),
        message: t('alerts.movements.deleteMovement.message', {
          type: t('enums.MovementTypeEnum.' + props.movement.movementType),
          amount: value.value,
          color: color.value
        })
      })

      if (res.resp) {
        await http.api.movements.delete(props.movement._id)

        emit('movement:removed')
      }
    }

    async function onChangeMovementPackClick () {
      isOpenRef.value = false

      const res = await alerts.ask({
        header: t('alerts.movements.changeMovementPack.title'),
        message: t('alerts.movements.changeMovementPack.message', {
          type: t('enums.MovementTypeEnum.' + props.movement.movementType),
          amount: value.value,
          color: color.value
        }),
        buttonOkText: t('alerts.movements.changeMovementPack.buttonOk'),
        inputs: Object.values(PackEnum).reduce((acc, pack) => {
          if (pack === PackEnum.NONE) {
            return acc
          }

          acc.push({
            name: 'clubPack',
            type: 'radio',
            label: t('enums.PackEnum.' + pack),
            value: pack as string,
            disabled: pack === props.movement.clubPack,
            checked: pack === props.movement.clubPack
          })

          return acc
        }, [] as any[])
      })

      if (res.resp && res.values !== props.movement.clubPack) {
        await http.api.movements.changePack(props.movement._id, res.values)

        emit('movement:packChanged')
      }
    }

    return {
      type, icon, color, value, movementColor,
      movementPack,
      formatMovementType,
      formatBrites, formatCurrency, formatLocaleDate,
      isOpenRef, event, setOpen, onRemoveMovementClick, onChangeMovementPackClick,
      isDeletable,
      showDetailsLabel
    }
  }
})
</script>


<style scoped lang="scss">

</style>
