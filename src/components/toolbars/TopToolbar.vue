<template>
  <ion-header>
    <ion-toolbar color="transparent" class="top-toolbar">
      <div slot="start">
        <!--        <ion-menu-button menu="main-menu"></ion-menu-button>-->
        <ClubButton version="outline"
                    icon only-icon icon-name="chevron-left"
                    size="default"
                    color="primary"
                    class="ms-3"
                    v-if="includeBack"
                    @click="$router.back()"
        ></ClubButton>
      </div>

      <ion-title>
        <slot></slot>
      </ion-title>
    </ion-toolbar>
  </ion-header>

</template>

<script lang="ts">

  import { defineComponent } from 'vue';
  import ClubButton from '@/components/ClubButton.vue';

  export default defineComponent({
    components: { ClubButton },
    props: {
      includeBack: Boolean
    },
    setup () {

      return {}
    }
  })
</script>
