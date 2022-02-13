<template>
  <TabsItems class="tabs-chips mb-4" :tabs-list="tabs" v-model="activeTab"></TabsItems>

  <Swiper :slidesPerView="'auto'"
          :centeredSlides="true"
          :spaceBetween="16"
          :allowTouchMove="true"
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
  import { computed, ComputedRef, defineComponent, inject, onMounted, PropType, Ref, ref, watch } from 'vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { TabEntry } from '@/@types/TabEntry';
  import { Semesters, Statistics } from '@/@types/Statistics';
  import { formatClubPack } from '@/@utilities/statuses';
  import { formatSemesterId } from '@/@utilities/movements';
  import TabsItems from '@/components/tabs/TabsItems.vue';
  import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
  import BriteValue from '@/components/BriteValue.vue';
  import {Swiper as SwiperInstance} from 'swiper';
  import {formatLocaleDateLong} from '@/@utilities/dates';
  import {formatBrites} from '@/@utilities/currency';
  import {PackEnum} from '@/@enums/pack.enum';
  import {AuthPlugin} from '@/plugins/AuthPlugin';
  import {AclPermissionsEnum} from '@/@enums/acl.permissions.enum';
  import ClubButton from '@/components/ClubButton.vue';
  import {modalController} from '@ionic/vue';
  import BritesModal from '@/components/modals/BritesModal.vue';
  import {useStore} from "vuex";
  import {storeKey} from "@/store";

  export default defineComponent({
    name: 'UserStatistics',
    components: {
      ClubButton,
      BriteValue,
      TabsItems, Swiper,
      SwiperSlide,
    },
    props: {
      userId: String,
      clubPack: String as PropType<PackEnum>,
    },
    emits: ['update:data', 'update:activeTab'],
    setup (props, { emit }) {
      const store = useStore(storeKey);
      const http = inject('http') as HttpPlugin;
      const auth = inject('auth') as AuthPlugin;
      const data: Ref<Statistics | null> = ref(null);
      const activeTab = ref('resoconto');
      let swiperInstance: SwiperInstance;

      const userIsAdmin = computed(() => store.getters["auth/isAdmin"])

      function calcSemesterTotals(semester: Semesters, prop: keyof Semesters): Record<string, number> {
        const totals = {};

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

          if (curr[0] === PackEnum.NONE && !userIsAdmin.value) {
            return acc
          }

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

            totals[entry[0]] += entry[1];
          });
        })

        return formatCalcTotals(totals);
      }

      async function showBritesModal (type: 'add' | 'remove', semesterId?: string) {
        const modal = await modalController
            .create({
              component: BritesModal,
              componentProps: {
                title: type === 'add' ? 'Aggiungi brite' : 'Rimuovi brite',
                userId: props.userId,
                type,
                semesterId,
                clubPack: props.clubPack
              },
            });

        await modal.present();
        const result = await modal.onWillDismiss();

        if (result.role === 'ok') {
          await fetchData();
        }
      }

      const tabs: ComputedRef<TabEntry[]> = computed(() => {
        const toReturn: TabEntry[] = [{
          id: 'resoconto',
          text: 'Resoconto',
          data: [
            {
              label: 'Totale utilizzabile',
              value: data.value?.totalRemaining || 0,
              details: calcResTotal()
            },
            ...(data.value?.expirations.reduce((acc, curr) => {
              acc.push({
                label: 'Scadenza: ' + formatLocaleDateLong(new Date(curr.date)),
                value: curr.remaining,
                details: formatCalcTotals(calcSemesterTotals(data.value?.semesters.find(sem => sem.expiresAt === curr.date) as Semesters, 'totalRemaining'))
              });

              return acc
            }, [] as any[]) || [])
          ]
        }]

        data.value?.semesters.forEach(el => {
          toReturn.push({
            id: el.semesterId,
            text: formatSemesterId(el.semesterId),
            data: [{
              label: 'Brite disponibili',
              value: el.totalRemaining,
              details: formatCalcTotals(calcSemesterTotals(el, 'totalRemaining')),
            }, {
              label: 'Brite utilizzati',
              value: el.totalUsed
            }, {
              label: 'Totale accumulato',
              value: el.totalEarned
            }],
            buttons: [
              {
                label: 'Rimuovi',
                click: () => showBritesModal('remove', activeTab.value),
                if: auth.hasPermissions(AclPermissionsEnum.BRITES_ALL_WRITE)
              },
              {
                label: 'Aggiungi',
                click: () => showBritesModal('add', activeTab.value),
                if: auth.hasPermissions(AclPermissionsEnum.BRITES_ALL_WRITE)
              },

            ].filter(el => el.if ?? true)
          })
        })

        return toReturn
      })

      function setControlledSwiper (swiper) {
        swiperInstance = swiper;
      }

      function onActiveIndexChange (e: any) {
        activeTab.value = tabs.value[e.activeIndex].id;
      }

      async function fetchData () {
        const result = await http.api.dashboard.readAll(props.userId);

        if (result) {
          data.value = result;
        }

        emit('update:data', data.value);
      }

      onMounted(async () => {
        await fetchData();
      });

      watch(() => activeTab.value, (value) => {
        const newIndex = Array.from(swiperInstance.slides).findIndex(slide => slide['dataset'].ref === value);

        swiperInstance.slideTo(newIndex);

        emit('update:activeTab', value);
      });

      return {
        tabs,
        activeTab,
        data,
        setControlledSwiper, onActiveIndexChange
      }
    }
  });
</script>

<style scoped>

</style>
