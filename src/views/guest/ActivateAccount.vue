<template>
  <IonPage>
    <IonHeader>
      <div class="logo-container"></div>
    </IonHeader>

    <IonContent>

      <!-- Sezione visibile appena si atterra sulla pagina -->
      <div v-if="!emailSent">
        <Form @submit="forgotForm.onSubmit">
          <ion-grid fixed>
            <ion-row class="ion-justify-content-center">
              <ion-col v-bind="colSize">
                <div class="mt-5">
                  <p class="login-first-text">
                    Ti invitiamo ad impostare la tua password.<br/>
                  </p>
                </div>
              </ion-col>
            </ion-row>

            <ion-row class="ion-justify-content-center">
              <ion-col v-bind="colSize">
                <FormInputV class="mb-4"
                            label="Password"
                            type="password"
                            clear-input
                            v-model="forgotForm.formData.password.modelValue"
                            :error="forgotForm.formData.password.errorMessage"
                />

                <FormInputV class="mb-4"
                            label="Conferma Password"
                            type="password"
                            clear-input
                            v-model="forgotForm.formData.passwordConfirmation.modelValue"
                            :error="forgotForm.formData.passwordConfirmation.errorMessage"
                />

                <PageLink :btn-props="{type: 'link'}"
                          :to="{name:'public.login'}"
                >Torna alla pagina di login
                </PageLink>
              </ion-col>
            </ion-row>
          </ion-grid>
        </Form>
      </div>

      <!-- Sezione visibile SOLO dopo l'invio della mail -->
      <div v-else>
        <!-- html con la v gigante che dice che tutto è andato bene -->
        <ion-grid fixed>
          <ion-row class="ion-justify-content-center">
            <ion-col v-bind="colSize">
              <div class="mt-5vh">
                <Icon name="check-large" style="font-size: 120px"></Icon>

                <p class="title ion-text-center">
                  La tua password è stata correttamente impostata. <br/>
                  Torna alla pagina di login per accedere.
                </p>
              </div>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </IonContent>

    <TheFooterButton :label="footerLabel"
                     :icon="footerIcon"
                     @click="onFooterClick"></TheFooterButton>
  </IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref } from 'vue'
import { onIonViewDidLeave } from '@ionic/vue'
import Icon from '@/components/Icon.vue'
import PageLink from '@/components/PageLink.vue'
import FormInputV from '@/components/forms/FormInputV.vue'
import TheFooterButton from '@/components/TheFooterButton.vue'
import router from '@/router'
import { ActivateAccountForm } from '@/composables/forms/ActivateAccountForm'
import { AuthPlugin } from '@/plugins/AuthPlugin'

export default defineComponent({
  name: 'ForgetPassword',
  components: { TheFooterButton, FormInputV, PageLink, Icon },
  setup () {
    const auth = inject('auth') as AuthPlugin
    const emailSent = ref(true)
    const colSize = {
      sizeLg: '6',
      sizeMd: '7',
      sizeSm: '8'
    }
    const forgotForm = new ActivateAccountForm({})
    const footerLabel = computed(() => emailSent.value ? 'Torna al login' : 'Imposta password')
    const footerIcon = computed(() => emailSent.value ? 'chevron-left' : 'lock')

    forgotForm.addEventListener('submitCompleted', (receivedData) => {
      // must login the user;
      // auth.manualLogin(receivedData)
    })

    forgotForm.onSubmitCompleted(() => {
      emailSent.value = true
    })

    onIonViewDidLeave(() => {
      emailSent.value = false
      forgotForm.resetForm()
    })

    async function onFooterClick () {
      if (!emailSent.value) {
        await forgotForm.onSubmit()

        return
      }

      await router.push({ name: 'public.login' })
    }

    return {
      emailSent,
      colSize,
      onFooterClick,
      forgotForm,
      footerLabel, footerIcon
    }
  }
})
</script>

<style scoped>
</style>







