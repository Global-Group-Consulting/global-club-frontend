<template>
  <div>
    <!--    <ion-refresher slot="fixed" @ionRefresh="$emit('manualRefresh',$event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>-->

    <ion-list v-if="movements.length > 0">
      <!--      <ion-list-header class="sticky-list-header">
              <ion-label>Movimenti {{ formatSemesterIdAsSemester(semesterId) }}</ion-label>
            </ion-list-header>-->

      <template v-for="(movement, i) in movements" :key="movement._id">
        <ion-list-header v-if="showYearHeader(i)" class="sticky-list-header">
          <ion-label>Movimenti {{ getMovementYear(movement) }}</ion-label>
        </ion-list-header>

        <WalletPremiumMovementListItem :movement="movement"></WalletPremiumMovementListItem>
      </template>
    </ion-list>

    <NoData v-else text="Per vedere i movimenti, scegli uno dei semestri disponibili.">
    </NoData>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, Ref, ref, watch } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { WalletPremiumStatisticEntry } from '@/@types/Wallet Premium/WalletPremiumStatisticEntry'
import WalletPremiumMovementListItem from '@/components/lists/movements/WalletPremiumMovementListItem.vue'
import { formatSemesterIdAsSemester } from '@/@utilities/movements'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import NoData from '@/components/NoData.vue'
import { useWithdrawal } from '@/composables/walletPremium/withdrawal'

export default defineComponent({
  name: 'WalletPremiumMovementsList',
  components: { NoData, WalletPremiumMovementListItem },
  props: {
    userId: String,
    semesterId: String
  },
  setup (props) {
    const semesterDetails: Ref<WalletPremiumStatisticEntry | null> = ref(null)
    const http = inject<HttpPlugin>('http') as HttpPlugin
    const withdrawal = useWithdrawal()

    // List of movements of a semester
    const movements: ComputedRef<WalletPremiumMovement[]> = computed(() => {
      if (semesterDetails.value && semesterDetails.value?.movements) {
        return semesterDetails.value.movements
      }

      return []
    })

    /**
     * Given a movement, returns the year of the movement
     *
     * @param {WalletPremiumMovement} movement
     * @returns {number|null}
     */
    function getMovementYear (movement: WalletPremiumMovement): number | null {
      if (!movement || !movement.withdrawableFrom) {
        if (movement) {
          const date = new Date(movement.referenceUsableUntil)
          date.setDate(date.getDate() + 1)

          return date.getFullYear()
        }

        return null
      }

      return new Date(movement.withdrawableFrom).getFullYear()
    }

    /**
     * Given an index, returns true if the year of the movement at that index is different from the previous one
     *
     * @param {number} i
     * @returns {boolean}
     */
    function showYearHeader (i): boolean {
      if (movements.value.length === 0) {
        return false
      }

      const prevYear = i === 0 ? null : getMovementYear(movements.value[i - 1])
      const currYear = getMovementYear(movements.value[i])

      return !prevYear || prevYear !== currYear
    }

    /**
     * Fetch semester details
     */
    async function fetchData () {
      // if missing userId or semesterId, do not fetch
      if (!props.userId || !props.semesterId) {
        return
      }

      withdrawal.setUserId(props.userId)
      const resp = await http.api.walletPremium.getMovements(props.userId, props.semesterId)

      if (resp) {
        semesterDetails.value = resp
      }
    }

    /**
     * Refresh the given movements
     *
     * @param {WalletPremiumMovement[]} _movements
     */
    function refreshSingleMovements (_movements: WalletPremiumMovement[]) {
      _movements.forEach(movement => {
        if (!semesterDetails.value?.movements) {
          return
        }

        // Find the index of the changed movement
        const index = semesterDetails.value.movements.findIndex(m => m._id === movement._id)

        if (index >= 0) {
          semesterDetails.value.movements[index] = movement
        }
      })
    }

    // After a withdrawal is completed, refresh the movements
    withdrawal.afterWithdraw((updatedMovements) => {
      refreshSingleMovements(updatedMovements)
    })

    // After a withdrawal is completed, refresh the movements
    withdrawal.afterWithdrawAll((updatedMovements) => {
      refreshSingleMovements(updatedMovements)
    })

    // each time the semesterId changes, fetch data
    watch(() => props.semesterId, semesterId => {
      // Avoid triggering fetch if semesterId is not set or is "resoconto"
      if (semesterId && semesterId !== 'resoconto') {
        fetchData()
      } else {
        semesterDetails.value = null
      }
    })

    return {
      movements,
      getMovementYear,
      showYearHeader
    }
  }
})
</script>

<style scoped lang="scss">
.sticky-list-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background-color: var(--ion-color-secondary);
}
</style>
