<template>
  <IonPage>
    <IonContent class="ion-padding">
      <div class="logo-container"></div>

      <form @submit.prevent="login" @keydown.enter="login">
        <ion-grid fixed>
          <ion-row class="ion-justify-content-center">
            <ion-col sizeLg="6" sizeMd="7" sizeSm="8">
              <div class="mt-5vh mb-4">
                <p class="text-large">Gentile utente,</p>
                <p class="title">Benvenuto</p>
              </div>

              <FormInput
                  label="Username"
                  type="mail"
                  clear-input
                  v-model="formData.email"
              />

              <FormInput
                  label="Password"
                  type="password"
                  clear-input
                  v-model="formData.password"
              />

              <FormInput v-model="userType"
                         component="ion-select"
                         label="Account to user for login"
                         :options="userTypeOptions"
                         :add-space-after="false"
              >
              </FormInput>
              <div class="ion-text-left">
                <small>Only for development reasons. This field will be removed in production!!</small>
              </div>


              <IonButton
                  class="btn-link"
                  fill="clear"
                  @click="$router.push('/reset')"
              >Hai dimenticato la password?
              </IonButton>
            </ion-col>
          </ion-row>
        </ion-grid>
      </form>
    </IonContent>

    <ion-footer>
      <ion-grid fixed>
        <ion-row class="ion-justify-content-center">
          <ion-col sizeLg="6" sizeMd="7" sizeSm="8" class="py-0">
            <ClubButton
              icon-name="login-btn"
              expanded
              size="large"
              @click="login"
            >
              Login
            </ClubButton>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-footer>
  </IonPage>
</template>

<script lang="ts" setup>
  import { inject, reactive, ref, watch } from "vue";
  import { AuthPlugin } from "@/plugins/AuthPlugin";
  // import Icon from "@/components/Icon.vue";
  import { AlertsPlugin } from "@/plugins/Alerts";
  import FormInput from "@/components/forms/FormInput.vue";
  import ClubButton from '@/components/ClubButton.vue';

  const auth: AuthPlugin | undefined = inject<AuthPlugin>("auth");
  const alerts: AlertsPlugin = inject<AlertsPlugin>("alerts") as AlertsPlugin;

  const formData = reactive({
    email: "",
    password: "",
  });

  /*
    ONLY FOR DEVELOPMENT PURPOSES
   */
  const userType = ref("user");
  const userTypeOptions = [{
    text: "Admin",
    value: "admin"
  }, {
    text: "User",
    value: "user"
  }]

  /*
   ONLY FOR DEVELOPMENT PURPOSES
  */
  watch(() => userType.value, (value) => {
    if (value === "admin") {
      formData.email = "florian.leica@gmail.com";
      formData.password = "password1234";
    } else if (value === "user") {
      formData.email = "florian.leica@hotmail.it";
      formData.password = "password1234";
    }
  }, { immediate: true })

  async function login () {
    try {
      await auth?.login({ ...formData });
    } catch (e) {
      await alerts.error(e);
    }
  }

  /*async function logout () {
    await auth?.logout();
  }*/
</script>

<style scoped>
</style>
