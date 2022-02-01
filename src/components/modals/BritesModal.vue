<template>
  <ion-header class="modal-header">
    <ion-toolbar>
      <ion-title>{{ title }}</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding modal-content">
    <Form @submit="form.onSubmit">
      <ion-row>
        <ion-col size="12" size-md="6">
          <FormInputV label="Importo"
                      v-model.number="form.formData.amountChange.modelValue"
                      :error="form.formData.amountChange.errorMessage"
          ></FormInputV>
        </ion-col>

        <ion-col size="12" size-md="6">
          <FormInputV component="ion-select" label="Semestre"
                      :options="semesterOptions"
                      :interface-options="{cssClass: 'alert-large'}"
                      v-model="form.formData.semesterId.modelValue"
                      :error="form.formData.semesterId.errorMessage"
          ></FormInputV>
        </ion-col>

        <ion-col size="12" size-md="6">
          <FormInputV component="ion-select" label="Pacchetto associato"
                      :options="clubPackOptions"
                      :interface-options="{cssClass: 'alert-large'}"
                      v-model.number="form.formData.clubPack.modelValue"
                      :error="form.formData.clubPack.errorMessage"
          ></FormInputV>
        </ion-col>

        <ion-col>
          <FormInputV label="Note"
                      v-model="form.formData.notes.modelValue"
                      :error="form.formData.notes.errorMessage"
          ></FormInputV>
        </ion-col>
      </ion-row>

    </Form>
  </ion-content>

  <ion-footer class="modal-footer">
    <ClubButton version="outline" @click="onCancelClick">Annulla</ClubButton>

    <ClubButton @click="form.onSubmit">Invia</ClubButton>
  </ion-footer>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, PropType, watch } from 'vue';
  import { ManualMovementForm } from '@/composables/forms/ManualMovementForm';
  import FormInputV from '@/components/forms/FormInputV.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import { modalController } from '@ionic/vue';
  import { SelectOption } from '@/@types/Form';
  import { formatSemesterId } from '@/@utilities/movements';
  import { PackEnum } from '@/@enums/pack.enum';
  import { useI18n } from 'vue-i18n';

  export default defineComponent({
    name: 'BritesModal',
    components: { ClubButton, FormInputV },
    props: {
      title: String,
      userId: {
        required: true,
        type: String
      },
      type: {
        required: true,
        type: String as PropType<'add' | 'remove'>
      },
      clubPack: String as PropType<PackEnum>,
      semesterId: String
    },
    setup (props) {
      const { t } = useI18n();
      const form = new ManualMovementForm({});
      const semesterOptions: ComputedRef<SelectOption[]> = computed(() => {
        const startYear = new Date().getFullYear();
        const startSemester = new Date().getMonth() >= 6 ? 2 : 1;
        let currSemester = startSemester;
        let currYear = startYear;

        return Array(6).fill('').map((el, i) => {
          currSemester = Math.abs((startSemester - i) % 2) === 1 ? 1 : 2;

          const semesterId = `${currYear}_${currSemester}`;
          const toReturn = {
            value: semesterId,
            text: `${currSemester === 1 ? 'I' : 'II'} ${currYear} (${formatSemesterId(semesterId)})`
          };

          if (startSemester === 2) {
            i % 2 !== 0 && currYear--;
          } else {
            i % 2 === 0 && currYear--;
          }

          return toReturn;
        });
      });
      const clubPackOptions: ComputedRef<SelectOption[]> = computed(() => {
        const packs = [PackEnum.BASIC, PackEnum.FAST, PackEnum.PREMIUM];

        return packs.map(el => ({
          value: el,
          text: t('enums.PackEnum.' + el)
        }));
      });

      function onCancelClick () {
        modalController.dismiss();
      }

      form.addEventListener('submitCompleted', () => {
        modalController.dismiss(null, 'ok');
      });

      watch(() => props.semesterId, value => {
        form.updateInitialFormData({
          semesterId: value,
          type: props.type,
          userId: props.userId,
          clubPack: props.clubPack
        });
      }, { immediate: true });

      return {
        form, semesterOptions,
        clubPackOptions,
        onCancelClick,
      };
    }
  });
</script>

<style scoped>

</style>
