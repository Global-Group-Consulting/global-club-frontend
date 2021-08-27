<template>
  <IonPage>
    <IonHeader :translucent="false">
      <IonToolbar>
        <IonButtons slot="start">
          <IonMenuButton color="primary"></IonMenuButton>
        </IonButtons>
        <IonTitle>{{ $route.params.id }}</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent class="ion-padding">
      <div v-if="!$store.getters['auth/isLoggedIn']">

        <h1>Main Content</h1>

        <ion-input :value="email" type="email"></ion-input>
        <ion-input :value="password" type="password"></ion-input>

        <ion-button @click="login">Login</ion-button>
      </div>

      <div v-else>
        <IonButton @click="logout">logout</IonButton>
      </div>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">

import {defineComponent} from "vue";

export default defineComponent({
  name: "Login",
  data() {
    return {
      email: "florian.leica@gmail.com",
      password: "password"
    }
  },
  methods: {
    async login() {
      try {
        await this.$auth.login({email: this.email, password: this.password});
      } catch (e) {
        console.log(e)
      }
    },
    async logout() {
      await this.$auth.logout();
    }
  }
})
</script>
