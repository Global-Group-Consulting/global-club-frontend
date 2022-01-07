<template>
  <Swiper v-bind="slideOpts" ref="slides"
          @init="setControlledSwiper">
    <SwiperSlide v-for="tab of tabsList" :key="tab.id" class="tabs-slide" v-slot="{isActive}">
      <div class="ion-padding-vertical">
        <slot :name="'tabSlide_' + tab.id" :tab="tab" :isActive="isActive" :onDataFetched="onDataFetched">
          please overwrite this tab by creating a template fort the
          <br>
          <code>v-slot:tabSlide_{{ tab.id }}</code>
        </slot>
      </div>
    </SwiperSlide>
  </Swiper>
</template>

<script lang="ts">
  import { defineComponent, nextTick, PropType, Ref, ref, watch } from 'vue';
  import { TabEntry } from '@/@types/TabEntry';
  import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue';
  import { Swiper as SwiperInstance, SwiperOptions } from 'swiper';

  export default defineComponent({
    name: "TabsSlides",
    components: { Swiper, SwiperSlide },
    props: {
      tabsList: {
        required: true,
        type: Array as PropType<TabEntry[]>
      },
      activeTab: [String, Number]
    },
    setup (props) {
      let swiperInstance: SwiperInstance;
      const slideOpts: SwiperOptions = {
        allowTouchMove: false,
        autoHeight: true,
        observer: true,
        observeSlideChildren: true,
        observeParents: true
      };

      function setControlledSwiper (swiper) {
        swiperInstance = swiper;
      }

      function onDataFetched () {
        nextTick(() => {
          swiperInstance.update()
        })
      }

      watch(() => props.activeTab, (newValue) => {
        const index = props.tabsList.findIndex(el => el.id === newValue);

        swiperInstance.slideTo(index)
      })

      return {
        slideOpts,
        setControlledSwiper,
        onDataFetched
      }
    }
  });
</script>

<style scoped>

</style>
