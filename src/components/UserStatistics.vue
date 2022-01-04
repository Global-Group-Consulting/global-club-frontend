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
            <BriteValue class="statistics-card-title" :value="row.value"></BriteValue>
            <span class="statistics-card-subtitle">{{ row.label }}</span>
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
  import { Statistics } from '@/@types/Statistics';
  import { formatSemesterId } from '@/@utilities/statuses';
  import TabsItems from '@/components/tabs/TabsItems.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
  import BriteValue from '@/components/BriteValue.vue';
  import { Swiper as SwiperInstance } from 'swiper';
  import { formatLocaleDate, formatLocaleDateLong } from '@/@utilities/dates';

  export default defineComponent({
    name: "UserStatistics",
    components: {
      BriteValue,
      TabsItems, Swiper,
      SwiperSlide,
    },
    setup () {
      const http = inject("http") as HttpPlugin;
      const data: Ref<Statistics | null> = ref(null)
      const activeTab = ref("resoconto");
      let swiperInstance: SwiperInstance;

      const tabs: ComputedRef<TabEntry[]> = computed(() => {
        const toReturn = [{
          id: "resoconto",
          text: "Resoconto",
          data: [
            {
              label: "Totale utilizzabile",
              value: data.value?.totalRemaining || 0,
            },
            ...(data.value?.expirations.reduce((acc, curr) => {
              acc.push({
                label: "Scadonenza: " + formatLocaleDateLong(new Date(curr.date)),
                value: curr.remaining
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
              value: el.totalRemaining
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
        const result = await http.api.dashboard.readAll()

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
