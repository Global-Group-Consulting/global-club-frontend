
<template>
  <IonPage>
    <IonContent>
      <div class="logo-container logoMargin"></div>
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="testo">
              <p>
                We are so glad to welcome you to Global Club App! Please login
                to your account to start tracking all your movement and enjoy
                it!
              </p>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <btn
        class="ion-text-capitalize"
        size="large"
        expand="block"
        @click="$router.push('/login')"
        >Iniziamo
      </btn>
    </IonContent>
  </IonPage>
</template>

<script lang="ts" setup>
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;800&display=swap");

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

.logoMargin {
  margin-top: 27vh;
}
</style>



