<template>
  <ion-item>
    <ion-thumbnail slot="start" class="center-inner-icon" v-if="$store.getters['mdAndUp']">
      <Icon :name="icon" :color="color" size="large"></Icon>
    </ion-thumbnail>

    <ion-label>
      <h2 :style="`color: ${color}`"><strong v-html="value"></strong></h2>
      <h4>{{ formatMovementType(movement.movementType) }}</h4>
      <small class="ion-text-wrap"
             v-if="movement.notes !== formatMovementType(movement.movementType)">Dettagli: {{ movement.notes }}</small>
    </ion-label>

    <ion-label slot="end">
      <div class="d-flex flex-column ion-align-items-end">
        <div class="ion-nowrap">
          <ion-chip :color="movementColor">{{ movementPack }}</ion-chip>
          <ion-chip class="small" disabled v-if="showSemester">{{ movement.semesterId.replace("_", "-") }}</ion-chip>
        </div>
        <small>{{ formatLocaleDate(movement.createdAt) }}</small>
      </div>
    </ion-label>
    <ion-label slot="end" v-if="$store.getters['auth/isSuperAdmin'] && isDeletable">
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
          <ion-item button @click="onRemoveMovementClick">
            <ion-label>Rimuovi movimento</ion-label>
          </ion-item>
        </ion-list>
      </ion-popover>
    </ion-label>
  </ion-item>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, inject, PropType, ref} from 'vue';
import {Movement} from '@/@types/Movement';
import {MovementTypeEnum, MovementTypeInList, MovementTypeOutList} from '@/@enums/movement.type.enum';
import {formatClubPack, formatMovementType} from '@/@utilities/statuses';
import {formatBrites, formatCurrency} from '@/@utilities/currency';
import {formatLocaleDate} from '@/@utilities/dates';
import Icon from "@/components/Icon.vue";
import ClubButton from "@/components/ClubButton.vue";
import {AlertsPlugin} from "@/plugins/Alerts";
import {useI18n} from "vue-i18n";
import {HttpPlugin} from "@/plugins/HttpPlugin";

export default defineComponent({
  name: "MovementListItem",
  components: {ClubButton, Icon},
  props: {
    movement: {
      type: Object as PropType<Movement>,
      required: true
    },
    showSemester: Boolean
  },
  setup(props, {emit}) {
    const isOpenRef = ref(false);
    const event = ref();
    const alerts = inject("alerts") as AlertsPlugin;
    const http = inject("http") as HttpPlugin;
    const {t} = useI18n();
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

    const isDeletable = computed(() => {
      return [MovementTypeEnum.DEPOSIT_ADDED, MovementTypeEnum.DEPOSIT_REMOVED].includes(props.movement.movementType)
    })

    function setOpen(state: boolean, ev?: Event) {
      event.value = ev;
      isOpenRef.value = state;
    }

    async function onRemoveMovementClick() {
      isOpenRef.value = false;

      const res = await alerts.ask({
        header: t("alerts.movements.deleteMovement.title"),
        message: t("alerts.movements.deleteMovement.message", {
          type: t("enums.MovementTypeEnum." + props.movement.movementType),
          amount: value.value,
          color: color.value
        })
      })

      if (res.resp) {
        await http.api.movements.delete(props.movement._id);

        emit("movement:removed")
      }
    }

    return {
      type, icon, color, value, movementColor,
      movementPack,
      formatMovementType,
      formatBrites, formatCurrency, formatLocaleDate,
      isOpenRef, event, setOpen, onRemoveMovementClick,
      isDeletable
    }
  }
  });
</script>


<style scoped lang="scss">

</style>
