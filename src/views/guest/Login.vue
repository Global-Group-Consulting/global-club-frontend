<template>
  <IonPage>
    <IonHeader>
      <div class="logo-container"></div>
    </IonHeader>

    <IonContent>
      <Form @submit="loginForm.onSubmit">
        <ion-grid fixed>
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
                     icon="login"
                     :col-size="colSize"></TheFooterButton>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from "vue";
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

      return {
        colSize,
        loginForm
      }
    }
  })
</script>

<style scoped>
</style>
