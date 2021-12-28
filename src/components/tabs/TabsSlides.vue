<template>
  <ion-slides :options="slideOpts" ref="slides">
    <ion-slide v-for="tab of tabsList" :key="tab.id" class="tabs-slide">
      <div class="ion-padding-vertical">
        <slot :name="'tabSlide_' + tab.id" :tab="tab">
          please overwrite this tab by creating a template fort the
          <br>
          <code>v-slot:tabSlide_{{ tab.id }}</code>
        </slot>
      </div>
    </ion-slide>
  </ion-slides>
</template>

<script lang="ts">
  import { defineComponent, PropType, Ref, ref, watch } from 'vue';
  import { TabEntry } from '@/@types/TabEntry';
  import { IonSlide } from '@ionic/vue';

  export default defineComponent({
    name: "TabsSlides",
    components: { IonSlide },
    props: {
      tabsList: {
        required: true,
        type: Array as PropType<TabEntry[]>
      },
      modelValue: [String, Number]
    },
    setup (props) {
      const slides: Ref<typeof IonSlide | null> = ref(null);
      const slideOpts = {
        allowTouchMove: false,
        autoHeight: true
      };

      watch(() => props.modelValue, (newValue) => {
        const index = props.tabsList.findIndex(el => el.id === newValue);

        slides.value?.$el.slideTo(index)
      })

      return {
        slideOpts,
        slides
      }
    }
  });
</script>

<style scoped>

</style>
