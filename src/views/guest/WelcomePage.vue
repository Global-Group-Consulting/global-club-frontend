
<template>
  <IonPage>
    <IonHeader>
      <div class="logo-container"></div>
    </IonHeader>

    <IonContent>
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="mt-5 ion-text-center">
              <h3>
                We are so glad to welcome you to Global Club App!<br/>
                Please login to your account to start tracking all your movement
                and enjoy it!
              </h3>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

    </IonContent>

    <TheFooterButton label="Iniziamo" @click="$router.push({name: 'public.login'})"/>
  </IonPage>
</template>

<script lang="ts" setup>
  import TheFooterButton from '@/components/TheFooterButton.vue';
</script>

<style scoped>
</style>



