
<template>
  <IonPage>
    <IonContent class="content-with-fixed-btn ion-padding">
      <div class="logo-container"></div>
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="mt-10vh ion-text-center">
              <p class="text-large">
                We are so glad to welcome you to Global Club App!<br />
                Please login to your account to start tracking all your movement
                and enjoy it!
              </p>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <!--
      <ion-grid fixed>
        <ion-row class="ion-justify-content-end">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            &lt;!&ndash;            &ndash;&gt;
          </ion-col>
        </ion-row>
      </ion-grid>-->
    </IonContent>
    <ion-footer>
      <ion-grid fixed class="grid-login">
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8" class="p-0">
            <ClubButton
              size="large"
              expanded
              @click="$router.push('/login')"
            >
              Iniziamo
            </ClubButton>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts" setup>
import ClubButton from '@/components/ClubButton.vue';
</script>

<style scoped>
</style>



