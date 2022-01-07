<template>
  <TabsItems class="tabs-chips mb-4" :tabs-list="tabs" v-model="activeTab"></TabsItems>

  <Swiper :slidesPerView="'auto'"
          :centeredSlides="true"
          :spaceBetween="16"
          :allowTouchMove="false"
          @init="setControlledSwiper">
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
      </ion-card>
    </swiper-slide>
  </Swiper>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, inject, onMounted, Ref, ref, watch } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { TabEntry } from '@/@types/TabEntry';
  import { Semesters, Statistics } from '@/@types/Statistics';
  import { formatClubPack, formatSemesterId } from '@/@utilities/statuses';
  import TabsItems from '@/components/tabs/TabsItems.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
  import BriteValue from '@/components/BriteValue.vue';
  import { Swiper as SwiperInstance } from 'swiper';
  import { formatLocaleDate, formatLocaleDateLong } from '@/@utilities/dates';
  import { formatBrites } from '@/@utilities/currency';
  import { PackEnum } from '@/@enums/pack.enum';

  export default defineComponent({
    name: "UserStatistics",
    components: {
      BriteValue,
      TabsItems, Swiper,
      SwiperSlide,
    },
    props: {
      userId: String
    },
    setup (props) {
      const http = inject("http") as HttpPlugin;
      const data: Ref<Statistics | null> = ref(null)
      const activeTab = ref("resoconto");
      let swiperInstance: SwiperInstance;

      function calcSemesterTotals (semester: Semesters, prop: keyof Semesters): Record<string, number> {
        const totals = {}

        Object.entries(semester.packs).forEach(entry => {
          const pack = entry[0];
          const value = entry[1];

          if (!totals[pack]) {
            totals[pack] = 0;
          }

          totals[pack] += value[prop]
        })

        return totals
      }

      function formatCalcTotals (totals: Record<string, number>) {
        return Object.entries(totals).reduce((acc, curr) => {
          const pack = formatClubPack(curr[0] as PackEnum);
          const value = formatBrites(curr[1]) as string
          acc.push(`<strong>${pack}</strong>: ${value}`)

          return acc;
        }, [] as string[]).join("; ");
      }

      function calcResTotal () {
        const totals: Record<string, number> = {};

        data.value?.semesters.forEach(semester => {
          const semTotals = calcSemesterTotals(semester, "totalRemaining");

          Object.entries(semTotals).forEach(entry => {
            if (!totals[entry[0]]) {
              totals[entry[0]] = 0;
            }

            totals[entry[0]] += entry[1]
          })
        })

        return formatCalcTotals(totals)
      }

      const tabs: ComputedRef<TabEntry[]> = computed(() => {
        const toReturn = [{
          id: "resoconto",
          text: "Resoconto",
          data: [
            {
              label: "Totale utilizzabile",
              value: data.value?.totalRemaining || 0,
              details: calcResTotal()
            },
            ...(data.value?.expirations.reduce((acc, curr) => {
              acc.push({
                label: "Scadenza: " + formatLocaleDateLong(new Date(curr.date)),
                value: curr.remaining,
                details: formatCalcTotals(calcSemesterTotals(data.value?.semesters.find(sem => sem.expiresAt === curr.date) as Semesters, "totalRemaining"))
              })

              return acc
            }, [] as any[]) || [])
          ]
        }]

        data.value?.semesters.forEach(el => {
          toReturn.push({
            id: el.semesterId,
            text: formatSemesterId(el.semesterId),
            data: [{
              label: "Brite disponibili",
              value: el.totalRemaining,
              details: formatCalcTotals(calcSemesterTotals(el, "totalRemaining"))
            }, {
              label: "Brite utilizzati",
              value: el.totalUsed
            }, {
              label: "Totale accumulato",
              value: el.totalEarned
            }]
          })
        })

        return toReturn
      })

      function setControlledSwiper (swiper) {
        swiperInstance = swiper;
      }

      onMounted(async () => {
        const result = await http.api.dashboard.readAll(props.userId)

        if (result) {
          data.value = result
        }
      })

      watch(() => activeTab.value, (value) => {
        const newIndex = Array.from(swiperInstance.slides).findIndex(slide => slide["dataset"].ref === value)

        swiperInstance.slideTo(newIndex)
      })

      return {
        tabs,
        activeTab,
        data,
        setControlledSwiper,
      }
    }
  });
</script>

<style scoped>

</style>
