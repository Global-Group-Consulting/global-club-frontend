<template>
  <table>
    <tbody>
    <tr v-for="(row, i) in tableData" :key="'row_' + i">
      <td v-for="(col, j) in row" :key="'row_' + i + '_col_' + j">
        <template v-if="col">
          <WalletPremiumChip :value="col.incomeAmount || col.initialAmount"
                             :type="j===0 ? 'primary': 'secondary'"
                             :version="getChipVersion(col)"
                             :movement-data="col"
                             @click="onChipClick(col)"/>
        </template>
      </td>
    </tr>
    </tbody>
  </table>

  <NoData v-if="!tableData.length"></NoData>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref, ref } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { formatBrites } from '@/@utilities/currency'
import WalletPremiumChip from '@/components/WalletPremiumChip.vue'
import { generateTableData } from '@/composables/walletPremium/semestersTable'
import { DateTime } from 'luxon'
import { WalletPremiumUserSummary } from '@/@types/Wallet Premium/WalletPremiumUserSummary'
import { WalletPremiumMovement } from '@/@types/Wallet Premium/WalletPremiumMovement'
import { formatLocaleDate } from '@/@utilities/dates'
import { useWithdrawal } from '@/composables/walletPremium/withdrawal'
import NoData from '@/components/NoData.vue'

export default defineComponent({
  name: 'WalletPremiumChipsTable',
  components: { NoData, WalletPremiumChip },
  props: {
    userId: String
  },
  setup (props) {
    const http = inject<HttpPlugin>('http') as HttpPlugin
    const semesters: Ref<WalletPremiumUserSummary> = ref({})
    const withdrawal = useWithdrawal()

    const tableData = computed(() => {
      return generateTableData(semesters.value)
    })

    withdrawal.afterWithdraw(() => {
      console.log("eventcalled")
      fetchData()
    })

    /**
     * Fetch semester details
     */
    async function fetchData () {
      // if missing userId or semesterId, do not fetch
      if (!props.userId) {
        return
      }

      // withdrawal.setUserId(props.userId)
      const resp = await http.api.walletPremium.getUserSummary(props.userId)

      if (resp) {
        semesters.value = resp as any
      }
    }

    function getChipVersion (col: WalletPremiumMovement) {
      if (!col || !col.withdrawableFrom || !col.withdrawableUntil) {
        return 'main'
      }

      const usableFrom = DateTime.fromISO(col.withdrawableFrom)
      const usableUntil = DateTime.fromISO(col.withdrawableUntil)
      let toReturn

      if (usableFrom > DateTime.now()) {
        toReturn = 'future'
      } else if (usableUntil < DateTime.now() && col.hasWithdrawMovements) {
        toReturn = 'past'
      } else if (usableFrom < DateTime.now() && usableUntil > DateTime.now()) {
        toReturn = 'present'
      } else if (usableUntil < DateTime.now() && !col.hasWithdrawMovements) {
        toReturn = 'lost'
      }

      if (toReturn === 'present' && !col.withdrawalRemaining) {
        toReturn = 'past'
      }

      return toReturn
    }

    function onChipClick (chip: WalletPremiumMovement) {
      if (getChipVersion(chip) !== 'present') {
        return
      }

      withdrawal.onWithdrawClick(chip.withdrawalRemaining || 0, chip._id)
    }

    onMounted(() => {
      fetchData()
    })

    return {
      semesters,
      tableData,
      formatBrites,
      getChipVersion,
      onChipClick
    }
  }
})
</script>

<style scoped lang="scss">
table {
  margin: 0 auto;

  tbody {
    td {
      padding: .2rem 1rem;
      vertical-align: text-bottom;
    }
  }
}

.semester-chip {
}
</style>
