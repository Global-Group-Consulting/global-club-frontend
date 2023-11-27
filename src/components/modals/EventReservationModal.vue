<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding modal-content">
    <div class="static-alert alert-warning  mb-5" v-if="reservation">
      <div v-if="showStatusAlert">
        <div class="mb-3">
          Prenotazione <strong>{{ $t('enums.EventReservationStatus.' + reservation?.status + '_passato') }}</strong> in
          data <strong>{{ formatLocaleDate(new Date(reservation?.statusUpdatedAt)) }}</strong>
        </div>

        <ion-list class="bg-transparent" style="--ion-item-background: transparent"
                  v-if="reservation?.status === 'accepted'">
          <ion-item v-for="pass of passes" :key="pass.passUrl"
                    :href="pass.passUrl" target="_blank">
            <ion-label class="ion-text-wrap">
              <h2>{{ pass.firstName }} {{ pass.lastName }}
                <ion-badge color="warning" v-if="pass.isCompanion"><small>Ospite</small></ion-badge>
              </h2>
            </ion-label>

            <club-button version="outline" @click.prevent="sendPassNotification(pass.passCode)"
                         class="mb-2" size="small"
                         color="light"
                         style="--padding-start: 1rem; --padding-end: 1rem;"
                         v-if="canSendPassNotification" icon-name="message" icon>
              Reinvia
            </club-button>
          </ion-item>
        </ion-list>

        <!--      <club-button version="solid" color="success" @click="downloadPass"
                           class="mb-2" size="small"
                           v-if="canDownloadPass" icon-name="link" icon>
                Mostra Pass
              </club-button>
              <club-button version="outline" @click="sendPassNotification"
                           class="mb-2" size="small"
                           color="light"
                           v-if="canSendPassNotification" icon-name="message" icon>
                Invia per email
              </club-button>-->
      </div>
      <div v-else-if="reservation">
        Prenotazione in attesa di approvazione...
      </div>

      <div class="mt-3 mb-3 border-bottom" v-if="$store.getters['auth/isAdmin']">
        <club-button version="outline" color="warning" @click="updateStatus('pending' as EventReservationStatus)"
                     v-if="canPending">
          Rimetti in attesa
        </club-button>
        <club-button version="outline" color="success" @click="updateStatus('accepted' as EventReservationStatus)"
                     v-if="canAccept">
          Approva
        </club-button>
        <club-button version="outline" color="danger" @click="updateStatus('rejected' as EventReservationStatus)"
                     v-if="canReject">
          Rifiuta
        </club-button>
      </div>
    </div>

    <Form @submit="reservationForm.onSubmit">
      <template v-if="reservation">
        <form-input :label="$t('forms.filters.user')"
                    :model-value="reservation?.user?.firstName + ' ' + reservation?.user?.lastName"
                    readonly></form-input>
      </template>

      <template v-else>
        <FormInputAutocomplete v-model:asyncModelValue="reservationForm.formData.userId.modelValue"
                               :async-options-url="$http.api.users.getUsersListOptionsUrl()"
                               async-filter-key="name"
                               async-options-value-key="value"
                               async-options-label-key="text"
                               async-options-emit-key="value"
                               :label="$t('forms.filters.user')"
                               v-if="!user"></FormInputAutocomplete>

        <!-- Semplifico il meccanismo e questa parte non server... per ora... -->
        <!--        <FormInputV label="Utente Ospite"
                            v-if="reservationForm.formData.guestUser.modelValue"
                            v-model:model-value="reservationForm.formData.userName.modelValue"
                            :error="reservationForm.formData.userName.errorMessage"></FormInputV>

                <FormToggleV label="L'utente è un ospite"
                             v-model:model-value="reservationForm.formData.guestUser.modelValue"></FormToggleV>

                <template v-if="reservationForm.formData.guestUser.modelValue">

                  <FormInputV label="Email"
                              v-model:model-value="reservationForm.formData.email.modelValue"
                              :error="reservationForm.formData.email.errorMessage"></FormInputV>
                  <FormInputAutocomplete label="Agente di riferimento"
                                         v-model:async-model-value="reservationForm.formData.referenceAgent.modelValue"
                                         :async-options-url="$http.api.users.getAgentsListOptionsUrl()"
                                         async-filter-key="name"
                                         async-options-value-key="value"
                                         async-options-label-key="text"
                                         async-options-emit-key="value"
                                         :error="reservationForm.formData.referenceAgent.errorMessage"
                  ></FormInputAutocomplete>
                </template>-->
      </template>

      <fieldset v-for="(companion, i) in reservationForm.formData.companions.modelValue" :key="'companion_' + i"
                class="my-4">
        <legend>Accompagnatore #{{ i + 1 }} <a class="ms-2" href="#" @click.prevent="removeCompanion(i)"
                                               v-if="!readonly">Rimuovi</a>
        </legend>
        <!--        <p class="text-danger">{{ reservationForm.formData.companions.errorMessage }}</p>-->

        <ion-grid padding="0" style="--ion-grid-padding: 0">
          <ion-row style="--ion-grid-column-padding: 8px; margin: 0 -8px">
            <ion-col>
              <FormInputV v-model="companion.firstName" label="Nome" :readonly="readonly"></FormInputV>
            </ion-col>
            <ion-col>
              <FormInputV v-model="companion.lastName" label="Cognome" :readonly="readonly"></FormInputV>
            </ion-col>
          </ion-row>
        </ion-grid>

        <FormInputV v-model="companion.email" label="Email" :readonly="readonly"
                    message="Email accompagnatore dove gli verrà inviato il pass per l'accesso"></FormInputV>
        <!--        <FormInputV v-model="companion.age" label="Età"></FormInputV>-->
      </fieldset>

      <club-button version="outline" color="primary" @click="addCompanion"
                   v-if="!readonly">Aggiungi accompagnatore
      </club-button>

      <div class="static-alert alert-info-bordered text-gray1 mt-5 mb-4" v-if="!readonly && !reservationForm.formData.companions.modelValue.length">
        E' possibile aggiungere degli accompagnatori per questa prenotazione.
        Premere il pulsante "Aggiungi accompagnatore" ed inserire nome, cognome ed una email valida dove verrà inviato
        il pass per l'accesso.
      </div>

    </Form>
  </ion-content>

  <ion-footer class="modal-footer">
    <ClubButton version="outline" @click="onCancelClick">
      {{ readonly ? 'Chiudi' : cancelText }}
    </ClubButton>

    <ClubButton @click="reservationForm.onSubmit" v-if="!readonly">
      {{ okText }}
    </ClubButton>
  </ion-footer>
</template>

<script lang="ts">
import { computed, defineComponent, inject, onMounted, PropType, Ref, ref } from 'vue'
import { modalController } from '@ionic/vue'
import ClubButton from '@/components/ClubButton.vue'
import FormInputV from '@/components/forms/FormInputV.vue'
import FormInputAutocomplete from '@/components/forms/FormInputAutocomplete.vue'
import { EventReservationForm } from '@/composables/forms/EventReservationForm'
import { EventPass, GlobalEventReservation } from '@/@types/GlobalEvent'
import FormInput from '@/components/forms/FormInput.vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { EventReservationStatus } from '@/@enums/event.reservation.status'
import { AlertsPlugin } from '@/plugins/Alerts'
import { formatLocaleDate } from '../../@utilities/dates'
import { useI18n } from 'vue-i18n'
import { upperFirst } from 'lodash'
import { useFileHandler } from '@/composables/fileHandler'

export default defineComponent({
  name: 'reservationModal',
  methods: { formatLocaleDate },
  components: { FormInput, FormInputV, FormInputAutocomplete, ClubButton },
  props: {
    title: String,
    okText: {
      type: String,
      default: 'Salva'
    },
    cancelText: {
      type: String,
      default: 'Annulla'
    },
    eventId: {
      type: String,
      required: true
    },
    user: {
      type: Object as PropType<{ firstName: string; lastName: string; _id: string }>
    },
    reservation: {
      type: Object as PropType<GlobalEventReservation>
    }
  },
  setup (props) {
    const http = inject('http') as HttpPlugin
    const alerts = inject('alerts') as AlertsPlugin
    const i18n = useI18n()
    const reservationForm = new EventReservationForm({}, props.eventId, props.reservation?._id)
    const companions: Ref<any[]> = ref([])
    const fileHandler = useFileHandler()

    const doNotCloseModal = ref(false)

    const readonly = computed(() => props.reservation && props.reservation?.status !== EventReservationStatus.PENDING)
    const canAccept = computed(() => props.reservation && props.reservation?.status !== EventReservationStatus.ACCEPTED)
    const canReject = computed(() => props.reservation && props.reservation?.status !== EventReservationStatus.REJECTED)
    const canPending = computed(() => props.reservation && props.reservation?.status !== EventReservationStatus.PENDING)
    const showStatusAlert = computed(() => props.reservation && props.reservation?.statusUpdatedAt)
    const canDownloadPass = computed(() => props.reservation && props.reservation?.status === EventReservationStatus.ACCEPTED)
    const canSendPassNotification = computed(() => props.reservation && props.reservation?.status === EventReservationStatus.ACCEPTED && props.reservation.passUrl)

    if (!props.reservation) {
      reservationForm.updateInitialFormData({
        companions: []
      })
    } else {
      reservationForm.updateInitialFormData({
        // Manually assign values to avoid reactivity issues
        userId: props.reservation.userId,
        companions: [
          ...props.reservation.companions
        ],
        reservationId: props.reservation._id
      })
    }

    reservationForm.addEventListener('submitCompleted', function () {
      if (doNotCloseModal.value) {
        return
      }

      modalController.dismiss(null, 'ok')
    })

    const passes = computed<EventPass[]>(() => {
      if (!props.reservation) {
        return []
      }

      const toReturn: EventPass[] = [{
        firstName: props.reservation.user.firstName,
        lastName: props.reservation.user.lastName,
        email: props.reservation.user.email,
        passUrl: props.reservation.passUrl,
        passCode: props.reservation.passCode,
        passQr: props.reservation.passQr
      }]

      props.reservation.companions.forEach(companion => {
        toReturn.push({
          ...companion,
          isCompanion: true
        })
      })

      return toReturn
    })

    function onCancelClick () {
      modalController.dismiss()
    }

    function addCompanion () {
      reservationForm.formData.companions.modelValue.push({
        firstName: '',
        lastName: '',
        age: ''
      })
    }

    function removeCompanion (index: string | number) {
      reservationForm.formData.companions.modelValue.splice(index, 1)
    }

    async function updateStatus (status: EventReservationStatus) {
      if (!props.reservation) {
        return
      }

      if (reservationForm.isDirty) {
        doNotCloseModal.value = true
        const res = await reservationForm.saveWithoutClose()

        doNotCloseModal.value = false

        if (!res) {
          return
        }
      }

      const resp = await alerts.ask({
        header: upperFirst(i18n.t('enums.EventReservationStatus.' + status + '_infinito') + '?'),
        message: `Sei sicuro di voler ${i18n.t('enums.EventReservationStatus.' + status + '_infinito')} la prenotazione?`,
        buttonOkText: 'Si, ' + (i18n.t('enums.EventReservationStatus.' + status + '_azione'))
      })

      if (resp.resp) {
        try {
          await http.api.events.reservations.updateStatus(props.eventId, props.reservation?._id, status)
          await modalController.dismiss(null, 'ok')
          await alerts.toastSuccess('Prenotazione approvata e pass inviati per email!')
        } catch (e) {
          console.log(e)
        }
      }
    }

    function downloadPass () {
      fileHandler.openInNewTab(process.env.VUE_APP_COMMUNICATIONS_URL + `/events/${props.eventId}/reservations/${props.reservation?._id}/pass`)
    }

    async function sendPassNotification (passCode?: string) {
      if (!props.reservation || !passCode) {
        return
      }

      try {
        await http.api.events.reservations.sendPassNotification(props.eventId, props.reservation?._id, passCode)

        await alerts.toastSuccess('Notifica inviata con successo!')
      } catch (e) {
        console.log(e)
      }
    }

    onMounted(() => {
      if (props.user) {
        reservationForm.formData.userId.modelValue = props.user._id
      }
    })

    return {
      reservationForm,
      companions,
      EventReservationStatus,
      readonly,
      canAccept,
      canReject,
      canPending,
      showStatusAlert,
      onCancelClick,
      addCompanion,
      removeCompanion,
      updateStatus,
      canDownloadPass,
      canSendPassNotification,
      downloadPass,
      sendPassNotification,
      passes
    }
  }
})
</script>

<style scoped lang="scss">

</style>
