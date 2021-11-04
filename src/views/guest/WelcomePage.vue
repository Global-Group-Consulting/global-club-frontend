
<template>
  <IonPage>
    <IonContent class="content-with-fixed-btn">
      <div class="logo-container logo-margin"></div>
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="mt-10vh">
              <p>
                We are so glad to welcome you <br />
                to Global Club App!<br />
                Please login to your account to <br />
                start tracking all your <br />
                movement and enjoy it!
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
            <btn
              class="ion-text-capitalize m-0"
              size="large"
              expand="block"
              @click="$router.push('/login')"
            >
              Iniziamo
            </btn>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts" setup>
</script>

<style scoped>
</style>



