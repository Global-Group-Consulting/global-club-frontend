
<template>
  <IonPage>
    <IonContent class="content-with-fixed-btn">
      <div class="logo-container logo-margin"></div>
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="testo">
              <p>
                We are so glad to welcome you <br />
                to Global Club App!<br />
                Please login to your account to <br />
                start tracking all your <br />
                movement and enjoy it!
              </p>
            </div>

            <div class="btn-fixed-container">
              <btn
                class="ion-text-capitalize"
                size="large"
                expand="block"
                @click="$router.push('/login')"
                >Iniziamo
              </btn>
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
  </IonPage>
</template>

<script lang="ts" setup>
</script>

<style scoped>
p {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: white;
  margin: 100px 0px 36px 0px;
}

.btn-centered {
  bottom: 20px;
  width: 100%;
}
</style>



