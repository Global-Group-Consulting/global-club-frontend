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
                    Ti invitiamo ad inserire la tua email.<br/>
                    Riceverai in seguito un messaggio con le istruzioni su come
                    reimpostare la tua passoword
                  </p>
                </div>
              </ion-col>
            </ion-row>

            <ion-row class="ion-justify-content-center">
              <ion-col v-bind="colSize">
                <FormInputV class="mb-4"
                            label="Email"
                            type="mail"
                            clear-input
                            v-model="forgotForm.formData.email.modelValue"
                            :error="forgotForm.formData.email.errorMessage"
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
                  Abbiamo preso in carico la tua richiesta. <br/>
                  A breve riceveri una email con le istruzioni necessarie.
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
    <!--    <ion-footer class="bg-secondary">
          <ion-grid fixed>
            <ion-row class="ion-justify-content-center">
              <ion-col v-bind="colSize">
                &lt;!&ndash; Visibile se l'email non è ancora stata inviata &ndash;&gt;
                <ClubButton
                    v-if="!emailSent"
                    size="large"
                    icon-name="lock-btn"
                    expanded
                    @click="onSendEmailClick"
                >
                  Recupera password
                </ClubButton>

                &lt;!&ndash; Visibile SOLO DOPO che l'email è stata inviata &ndash;&gt;
                <ClubButton
                  v-else
                  size="large"
                  icon-name="chevron-left"
                  expanded
                  @click="$router.push({ name: 'public.login' })"
                >
                  Torna al login
                </ClubButton>
              </ion-col>
            </ion-row>
          </ion-grid>
        </ion-footer>-->
  </IonPage>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from "vue";
  import { onIonViewDidLeave } from "@ionic/vue";
  import Icon from "@/components/Icon.vue";
  import PageLink from '@/components/PageLink.vue';
  import FormInputV from '@/components/forms/FormInputV.vue';
  import { ForgotPasswordForm } from '@/composables/forms/ForgotPasswordForm';
  import TheFooterButton from '@/components/TheFooterButton.vue';
  import router from '@/router';

  export default defineComponent({
    name: "ForgetPassword",
    components: { TheFooterButton, FormInputV, PageLink, Icon },
    setup () {
      const emailSent = ref(false);
      const colSize = {
        sizeLg: "6",
        sizeMd: "7",
        sizeSm: "8"
      }
      const forgotForm = new ForgotPasswordForm({})
      const footerLabel = computed(() => emailSent.value ? "Torna al login" : "Recupera password")
      const footerIcon = computed(() => emailSent.value ? "chevron-left" : "lock")

      forgotForm.onSubmitCompleted(() => {
        emailSent.value = true;
      })

      onIonViewDidLeave(() => {
        emailSent.value = false;
        forgotForm.resetForm()
      });

      async function onFooterClick () {
        if (!emailSent.value) {
          await forgotForm.onSubmit()

          return
        }

        await router.push({ name: "public.login" });
      }

      return {
        emailSent,
        colSize,
        onFooterClick,
        forgotForm,
        footerLabel, footerIcon
      };
    },
  });
</script>

<style scoped>
</style>







