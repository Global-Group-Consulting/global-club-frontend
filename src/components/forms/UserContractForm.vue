<template>
  <ion-grid class="p-0">

    must add vee validate form component
    https://vee-validate.logaretm.com/v4/guide/components/handling-forms

    <h3>Contratto Club</h3>
    <ion-row class="mb-5">
      <ion-col v-bind="cols">
        <FormInput label="N° tessera Club" :readonly="readonly" v-model="formData.clubCardNumber"></FormInput>
      </ion-col>
      <ion-col v-bind="cols">
        <FormInput label="Pacchetto attivo" :readonly="readonly" v-model="formData.clubPack"></FormInput>
      </ion-col>
    </ion-row>

    <h3>Contratto Global</h3>
    <ion-row>
      <ion-col v-bind="cols">
        <FormInput label="N° contratto Global" :readonly="readonly" v-model="formData.contractNumber"></FormInput>
      </ion-col>
      <ion-col v-bind="cols">
        <FormInput label="Data Stipula contratto" :readonly="readonly" v-model="formData.contractDate"></FormInput>
      </ion-col>
      <ion-col v-bind="cols">
        <FormInput label="Percentuale assegnata" :readonly="readonly"
                   :model-value="user.contractPercentage"></FormInput>
      </ion-col>
    </ion-row>

  </ion-grid>
</template>

<script lang="ts">
  import { computed, defineComponent, PropType, Ref, ref, watch } from 'vue';
  import FormInput from '@/components/forms/FormInput.vue';
  import { User } from '@/@types/User';

  export default defineComponent({
    name: "UserContractForm",
    components: { FormInput },
    props: {
      user: {
        required: true,
        type: Object as PropType<User>
      },
      readonly: Boolean
    },
    setup (props) {
      const cols = computed(() => {
        return {
          "sizeLg": 4,
          "sizeMd": 6,
          "size": 12,
        }
      })

      const formData: Ref<User> = ref({} as User);

      watch(() => props.user, value => {
        Object.assign(formData.value, value)
      }, { immediate: true })

      return {
        cols, formData
      }
    }
  });
</script>

<style scoped>

</style>
