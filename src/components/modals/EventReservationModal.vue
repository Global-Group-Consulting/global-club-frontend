<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content class="ion-padding modal-content">
    <div class="static-alert alert-info" v-if="showStatusAlert">
      Prenotazione <strong>{{ $t('enums.EventReservationStatus.' + reservation?.status + '_passato') }}</strong> in data
      <strong>{{ formatLocaleDate(new Date(reservation?.statusUpdatedAt)) }}</strong>

      <br>

      <club-button version="solid" color="success" @click="downloadPass"
                   class="mb-4"
                   v-if="canDownloadPass" icon-name="link" icon>
        Mostra Pass
      </club-button>
    </div>

    <div class="mb-3 border-bottom">
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

    <Form @submit="reservationForm.onSubmit">
      <template v-if="reservation">
        <form-input :label="$t('forms.filters.user')"
                    :model-value="reservation?.user.firstName + ' ' + reservation?.user.lastName"
                    readonly></form-input>
      </template>

      <FormInputAutocomplete v-else v-model:asyncModelValue="reservationForm.formData.userId.modelValue"
                             :async-options-url="$http.api.users.getUsersListOptionsUrl()"
                             async-filter-key="name"
                             async-options-value-key="value"
                             async-options-label-key="text"
                             async-options-emit-key="value"
                             :label="$t('forms.filters.user')"
                             :error="reservationForm.formData.userId.errorMessage"></FormInputAutocomplete>

      <fieldset v-for="(companion, i) in reservationForm.formData.companions.modelValue" :key="'companion_' + i">
        <legend>Accompagnatore #{{ i + 1 }} <a class="ms-2" href="#" @click.prevent="removeCompanion(i)"
                                               v-if="!readonly">Rimuovi</a>
        </legend>
        <!--        <p class="text-danger">{{ reservationForm.formData.companions.errorMessage }}</p>-->

        <FormInputV v-model="companion.firstName" label="Nome" :readonly="readonly"></FormInputV>
        <FormInputV v-model="companion.lastName" label="Cognome" :readonly="readonly"></FormInputV>
        <!--        <FormInputV v-model="companion.age" label="Età"></FormInputV>-->
      </fieldset>

      <club-button version="link" @click="addCompanion"
                   v-if="!readonly">Aggiungi accompagnatore
      </club-button>

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
import { computed, defineComponent, inject, PropType, Ref, ref } from 'vue'
import { modalController } from '@ionic/vue'
import ClubButton from '@/components/ClubButton.vue'
import FormInputV from '@/components/forms/FormInputV.vue'
import FormInputAutocomplete from '@/components/forms/FormInputAutocomplete.vue'
import { EventReservationForm } from '@/composables/forms/EventReservationForm'
import { GlobalEventReservation } from '@/@types/GlobalEvent'
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

    function removeCompanion (index: number) {
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
        } catch (e) {
          console.log(e)
        }
      }
    }

    function downloadPass () {
      fileHandler.openInNewTab(process.env.VUE_APP_COMMUNICATIONS_URL + `/events/${props.eventId}/reservations/${props.reservation?._id}/pass`)
    }

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
      downloadPass
    }
  }
})
</script>

<style scoped lang="scss">

</style>
