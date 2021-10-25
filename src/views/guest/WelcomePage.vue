
<template>
  <IonPage>
    <IonContent>
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
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid fixed>
        <ion-row class="ion-justify-content-end">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
            <div class="btn-container">
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
      <ion-grid>
        <ion-row class="ion-justify-content-start">
          <ion-col size="3">
            <div>1 of 2</div>
          </ion-col>
          <ion-col size="3">
            <div>2 of 2</div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <ion-col size="3">
            <div>1 of 2</div>
          </ion-col>
          <ion-col size="3">
            <div>2 of 2</div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-end">
          <ion-col size="3">
            <div>1 of 2</div>
          </ion-col>
          <ion-col size="3">
            <div>2 of 2</div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-around">
          <ion-col size="3">
            <div>1 of 2</div>
          </ion-col>
          <ion-col size="3">
            <div>2 of 2</div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-between">
          <ion-col size="3">
            <div>1 of 2</div>
          </ion-col>
          <ion-col size="3">
            <div>2 of 2</div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-evenly">
          <ion-col size="3">
            <div>1 of 2</div>
          </ion-col>
          <ion-col size="3">
            <div>2 of 2</div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-grid>
        <ion-row class="ion-align-items-start">
          <ion-col>
            <div>1 of 4</div>
          </ion-col>
          <ion-col>
            <div>2 of 4</div>
          </ion-col>
          <ion-col>
            <div>3 of 4</div>
          </ion-col>
          <ion-col>
            <div>
              4 of 4 <br />
              # <br />
              # <br />
              #
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-align-items-end">
          <ion-col>
            <div>1 of 4</div>
          </ion-col>
          <ion-col>
            <div>2 of 4</div>
          </ion-col>
          <ion-col>
            <div>3 of 4</div>
          </ion-col>
          <ion-col>
            <div>
              4 of 4 <br />
              # <br />
              # <br />
              #
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-align-items-center">
          <ion-col>
            <div>1 of 4</div>
          </ion-col>
          <ion-col>
            <div>2 of 4</div>
          </ion-col>
          <ion-col>
            <div>3 of 4</div>
          </ion-col>
          <ion-col>
            <div>
              4 of 4 <br />
              # <br />
              # <br />
              #
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-align-items-baseline">
          <ion-col>
            <div>1 of 4</div>
          </ion-col>
          <ion-col>
            <div>2 of 4</div>
          </ion-col>
          <ion-col>
            <div>3 of 4</div>
          </ion-col>
          <ion-col>
            <div>
              4 of 4 <br />
              # <br />
              # <br />
              #
            </div>
          </ion-col>
        </ion-row>

        <ion-row class="ion-align-items-stretch">
          <ion-col>
            <div>1 of 4</div>
          </ion-col>
          <ion-col>
            <div>2 of 4</div>
          </ion-col>
          <ion-col>
            <div>3 of 4</div>
          </ion-col>
          <ion-col>
            <div>
              4 of 4 <br />
              # <br />
              # <br />
              #
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
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
  position: relative;
  bottom: 20px;
  width: 100%;
}
</style>



