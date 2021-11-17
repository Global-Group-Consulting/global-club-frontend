<template>
  <router-link
      :to="resolvedPath"
      custom
      v-slot="{ href,navigate}">
    <ion-button v-bind="ionBtnProps"
                @click="navigate"
                :href="href">
      <slot></slot>
    </ion-button>

  </router-link>
</template>

<script lang="ts">
  import { RouteLocationRaw, useRouter } from 'vue-router';
  import { computed, defineComponent, PropType } from 'vue';
  import { IonButton } from '@ionic/vue';

  export interface IonButtonInterface {
    disabled?: boolean;
    strong?: boolean;
    fill?: 'default' | 'clear' | 'outline' | 'solid';
    mode?: import('@ionic/core').Mode;
    type?: 'button' | 'reset' | 'submit';
    color?: string;
    size?: 'small' | 'default' | 'large';
    modelValue?: string | boolean;
    buttonType?: string;
    expand?: 'full' | 'block';
    routerDirection?: import('@ionic/core').RouterDirection;
    routerAnimation?: import('@ionic/core').AnimationBuilder;
    download?: string;
    href?: string;
    rel?: string;
    shape?: 'round';
    target?: string;
  }

  export default defineComponent({
    props: {
      to: {
        type: Object as PropType<RouteLocationRaw>
      },
      btnProps: Object as PropType<IonButtonInterface>
    },
    setup (props) {
      const router = useRouter();

      const resolvedPath = computed(() => {
        if (!props.to) {
          return ""
        }

        return router.resolve(props.to).path;
      });

      const ionBtnProps = computed(() => {
        return Object.assign({}, props.btnProps);
      });
    }
  })

</script>

<style scoped>

</style>
