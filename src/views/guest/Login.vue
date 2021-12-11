<template>
  <IonPage>
    <IonHeader>
      <div class="logo-container"></div>
    </IonHeader>

    <IonContent class="ion-padding">
      <Form @submit="loginForm.onSubmit">
        <ion-grid fixed class="ion-no-padding">
          <ion-row class="ion-justify-content-center">
            <ion-col v-bind="colSize">
              <div class="">
                <h3 class="mt-0">Gentile utente,</h3>
                <h2 class="mt-2 mb-4 font-bold">Benvenuto</h2>
              </div>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-center">
            <ion-col v-bind="colSize">
              <FormInputV class="mb-4"
                          label="Username"
                          type="mail"
                          clear-input
                          v-model="loginForm.formData.email.modelValue"
                          :error="loginForm.formData.email.errorMessage"
              />

              <FormInputV class="mb-4"
                          label="Password"
                          type="password"
                          clear-input
                          v-model="loginForm.formData.password.modelValue"
                          :error="loginForm.formData.password.errorMessage"
              />

              <FormInputV v-model="userType"
                          component="ion-select"
                          label="Account to user for login"
                          :options="userTypeOptions"
                          :add-space-after="false"
              >
              </FormInputV>

              <div class="ion-text-left mb-4">
                <small>Only for development reasons. This field will be removed in production!!</small>
              </div>

              <PageLink :to="{name:'public.reset'}"
                        :btn-props="{version:'link'}">
                Hai dimenticato la password?
              </PageLink>

              <!-- Fake submit button that allow the form submit by pressing enter key -->
              <input type="submit" style="display: none">
            </ion-col>
          </ion-row>
        </ion-grid>
      </Form>
    </IonContent>

    <TheFooterButton label="Login" @click="loginForm.onSubmit"
                     :col-size="colSize"></TheFooterButton>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent, inject, reactive, ref, watch } from "vue";
  import { AuthPlugin } from "@/plugins/AuthPlugin";
  import { AlertsPlugin } from "@/plugins/Alerts";
  import TheFooterButton from '@/components/TheFooterButton.vue';
  import FormInputV from '@/components/forms/FormInputV.vue';
  import PageLink from '@/components/PageLink.vue';
  import { LoginForm } from '@/composables/forms/LoginForm';
  import { Form } from 'vee-validate';

  export default defineComponent({
    name: "Login",
    components: {
      TheFooterButton, FormInputV, PageLink, Form
    },
    setup () {
      const colSize = {
        sizeLg: "6",
        sizeMd: "7",
        sizeSm: "8"
      }

      const loginForm = new LoginForm({
        dataToWatch: () => ({})
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
          loginForm.updateInitialFormData({
            email: "florian.leica@gmail.com",
            password: "password1234",
          })
        } else if (value === "user") {
          loginForm.updateInitialFormData({
            email: "florian.leica@hotmail.it",
            password: "password1234",
          })
        }
      }, { immediate: true })

      return {
        colSize,
        userTypeOptions,
        userType,
        loginForm
      }
    }
  })
</script>

<style scoped>
</style>
