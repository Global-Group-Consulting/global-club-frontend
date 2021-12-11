<template>
  <IonFooter class="bg-secondary p-3">
    <ion-grid fixed class="ion-no-padding">
      <ion-row class="ion-justify-content-center">
        <ion-col class="py-0" v-bind="colSize">
          <ClubButton class="m-0"
                      icon-name="login-btn"
                      expanded
                      size="large"
                      @click="$emit('click')"
          >
            {{ label }}
          </ClubButton>
        </ion-col>
      </ion-row>
    </ion-grid>
  </IonFooter>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ClubButton from '@/components/ClubButton.vue';

  export default defineComponent({
    name: "TheFooterButton",
    components: { ClubButton },
    props: {
      label: String,
      colSize: {
        type: Object,
        default: () => ({
          sizeLg: "6",
          sizeMd: "7",
          sizeSm: "8"
        })
      }
    },
    emits: ["click"]
  });
</script>

<style scoped>

</style>
