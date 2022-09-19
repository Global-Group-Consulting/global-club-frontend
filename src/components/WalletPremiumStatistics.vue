<template>
  <TabsItems class="tabs-chips mb-4" :tabs-list="tabs" v-model="activeTab">
    <template v-slot:top-badge="{tab}">
      <ion-badge color="danger" v-if="tab.expired">Scaduto</ion-badge>
    </template>
  </TabsItems>

  <Swiper :slidesPerView="'auto'"
          :centeredSlides="true"
          :spaceBetween="16"
          :allowTouchMove="true"
          :simulate-touch="false"
          @init="setControlledSwiper"
          @activeIndexChange="onActiveIndexChange">
    <swiper-slide class="statistics-card-wrapper"
                  v-for="tab in tabs" :key="tab.id"
                  :data-ref="tab.id" v-slot="{ isActive }">
      <ion-card class="statistics-card" :class="{'is-active': isActive}">
        <ion-card-content>
          <div class="statistics-card-row" v-for="(row, i) of tab.data" :key="i">
            <div>
              <BriteValue class="statistics-card-title" :value="row.value"></BriteValue>
            </div>

            <span class="statistics-card-subtitle">{{ row.label }}
              <span v-if="row.details">(<em v-html="row.details"></em>)</span>
            </span>
          </div>
        </ion-card-content>

        <div v-if="tab.buttons && tab.buttons.length" class="ion-card-footer">
          <ClubButton v-for="(btn, i) in tab.buttons" :key="i"
                      @click.stop="btn.click ? btn.click() : null"
                      size="small" version="link">
            {{ btn.label }}
          </ClubButton>
        </div>
      </ion-card>
    </swiper-slide>
  </Swiper>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, onMounted, PropType, Ref, ref, watch } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { TabEntry } from '@/@types/TabEntry'
import { Semesters, Statistics } from '@/@types/Statistics'
import { formatClubPack } from '@/@utilities/statuses'
import { formatSemesterId, formatSemesterIdAsSemester } from '@/@utilities/movements'
import TabsItems from '@/components/tabs/TabsItems.vue'
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue'
import BriteValue from '@/components/BriteValue.vue'
import { Swiper as SwiperInstance } from 'swiper'
import { formatLocaleDateLong } from '@/@utilities/dates'
import { formatBrites } from '@/@utilities/currency'
import { PackEnum } from '@/@enums/pack.enum'
import { AuthPlugin } from '@/plugins/AuthPlugin'
import { AclPermissionsEnum } from '@/@enums/acl.permissions.enum'
import ClubButton from '@/components/ClubButton.vue'
import { modalController } from '@ionic/vue'
import BritesModal from '@/components/modals/BritesModal.vue'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { WalletPremiumStatisticEntry } from '@/@types/Wallet Premium/WalletPremiumStatisticEntry'
import { useWithdrawal } from '@/composables/walletPremium/withdrawal'

export default defineComponent({
  name: 'WalletPremiumStatistics',
  components: {
    ClubButton,
    BriteValue,
    TabsItems, Swiper,
    SwiperSlide
  },
  props: {
    userId: String,
    clubPack: String as PropType<PackEnum>,
    onlyFast: Boolean
  },
  emits: ['update:data', 'update:activeTab', 'withdraw:all', 'withdraw:semester'],
  setup (props, { emit }) {
    const store = useStore(storeKey)
    const http = inject('http') as HttpPlugin
    const auth = inject('auth') as AuthPlugin
    const data: Ref<WalletPremiumStatisticEntry[] | null> = ref(null)
    const activeTab = ref('resoconto')
    const withdrawal = useWithdrawal()
    let swiperInstance: SwiperInstance

    const userIsAdmin = computed(() => store.getters['auth/isAdmin'])

    const tabs: ComputedRef<TabEntry[]> = computed(() => {
      const withdrawable = data.value?.reduce((acc, curr) => acc + curr.withdrawable, 0) || 0

      const toReturn: TabEntry[] = [{
        id: 'resoconto',
        text: 'Resoconto',
        data: [
          {
            label: 'Totale da riscuotere',
            value: withdrawable,
            details: 'questo mese'
          },
          {
            label: 'Totale riscosso',
            value: data.value?.reduce((acc, curr) => acc + curr.withdrawn, 0) || 0,
            details: 'questo mese'
          },
          {
            label: 'Totale accumulato',
            value: data.value?.reduce((acc, curr) => acc + curr.earned, 0) || 0,
            details: 'questo mese'
          }
        ],
        buttons: [
          {
            label: 'Riscuoti tutto',
            click: () => withdrawal.onWithdrawAllClick(withdrawable, data.value?.reduce((acc, curr) => {
              acc.push(curr.semesterDetails.id)
              return acc
            }, [] as string[]) || []),
            if: (data.value?.reduce((acc, curr) => acc + curr.withdrawable, 0) || 0) > 0
          }
        ].filter(el => el.if ?? true)
      }]

      data.value?.forEach(el => {
        toReturn.push({
          id: el.semesterDetails.id,
          text: formatSemesterIdAsSemester(el.semesterDetails.id),
          expired: false,
          data: [{
            label: 'Brite da riscuotere',
            value: el.withdrawable,
            details: 'questo mese'
          }, {
            label: 'Brite riscossi',
            value: el.withdrawn,
            details: 'questo mese'
          }, {
            label: 'Totale accumulato',
            value: el.earned,
            details: 'questo mese'
          }],
          buttons: [
            {
              label: 'Riscuoti',
              click: () => withdrawal.onWithdrawClick(el.semesterDetails.id, el.withdrawable),
              if: el.withdrawable > 0
            }
          ].filter(el => el.if ?? true)
        })
      })

      return toReturn
    })

    function setControlledSwiper (swiper) {
      swiperInstance = swiper
    }

    function onActiveIndexChange (e: any) {
      activeTab.value = tabs.value[e.activeIndex].id
    }

    async function fetchData () {
      const result = await http.api.walletPremium.getStatistics(props.userId as string)

      if (result) {
        data.value = result
      }

      emit('update:data', data.value)
    }

    function resetData () {
      data.value = null
      emit('update:data', data.value)
    }

    onMounted(async () => {
      await fetchData()
    })

    watch(() => activeTab.value, (value) => {
      const newIndex = Array.from(swiperInstance.slides).findIndex(slide => slide['dataset'].ref === value)

      swiperInstance.slideTo(newIndex)

      emit('update:activeTab', value)
    })

    return {
      tabs,
      activeTab,
      data,
      setControlledSwiper, onActiveIndexChange,
      fetchData,
      resetData
    }
  }
})
</script>

<style scoped lang="scss">
.swiper-wrapper {
  .swiper-slide {
    display: flex;
    height: auto;
    min-height: 100%;

    .statistics-card {
      width: 100%;
      background-size: 40%;
      transition: background-size .4s ease-in-out, opacity 0.3s;

      &.is-active {
        background-size: 110%;
      }
    }
  }
}
</style>
