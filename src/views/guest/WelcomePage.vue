
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

            <ion-grid>
              <ion-row>
                <ion-col size="12" size-sm>
                  <div>1 of 4</div>
                </ion-col>
                <ion-col size="12" size-sm>
                  <div>2 of 4</div>
                </ion-col>
                <ion-col size="12" size-sm>
                  <div>3 of 4</div>
                </ion-col>
                <ion-col size="12" size-sm>
                  <div>4 of 4</div>
                </ion-col>
              </ion-row>
            </ion-grid>

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
.text {
  width: 50vmin;
  margin-left: auto;
  margin-right: auto;
}

p {
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #969696;
  margin: 100px 0px 36px 0px;
}

.btn-centered {
  bottom: 20px;
  width: 100%;
}
</style>



