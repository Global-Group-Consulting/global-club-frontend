
<template>
  <IonPage>
    <IonContent class="content-with-fixed-btn">
      <div class="logo-container logo-margin"></div>
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="testo">
              <p>
                We are so glad to welcome you to Global Club App! Please login
                to your account to start tracking all your movement and enjoy
                it!
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
.text {
  width: 50vmin;
  margin-left: auto;
  margin-right: auto;
}

p {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: 1rem;
  color: #969696;
  margin: 30px 0px 36px 0px;
}

.logo-margin {
  margin-top: 27vh;
}

/* .btn-container {
  position: relative;

  text-align: center;
} */
/**
* TODO capire come spostare il bottone in basso anche se in grid
*/

.btn-centered {
  bottom: 20px;
  width: 100%;
}

</style>



