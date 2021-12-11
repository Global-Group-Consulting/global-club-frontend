<template>
  <div>
    <ion-row v-if="!readonly">
      <ion-col class="ion-text-right">
        <ClubButton version="outline" @click="userContractForm.onEditClick" size="small">
          {{ $t("forms.userContract.edit" + (userContractForm.editing ? "_cancel" : '')) }}
        </ClubButton>
      </ion-col>
    </ion-row>


    <Form @submit="userContractForm.onSubmit">
      <h3>{{ $t("forms.userContract.title_contract_club") }}</h3>
      <ion-row class="mb-5">
        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userContract.club_card_number')" :readonly="!editable"
                      v-model="userContractForm.formData.clubCardNumber.modelValue"
                      :error="userContractForm.formData.clubCardNumber.errorMessage"/>
        </ion-col>
        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userContract.club_pack')" :readonly="!editable"
                      :component="'ion-select'" :options="clubPackOptions"
                      v-model="userContractForm.formData.clubPack.modelValue"
                      :error="userContractForm.formData.clubPack.errorMessage"/>
        </ion-col>
      </ion-row>

      <h3>{{ $t("forms.userContract.title_contract_global") }}</h3>
      <ion-row>
        <ion-col v-bind="cols">
          <FormInput :label="$t('forms.userContract.global_contract_number')" disabled
                     :model-value="modelValue.contractNumber"></FormInput>
        </ion-col>
        <ion-col v-bind="cols">
          <FormInput :label="$t('forms.userContract.global_contract_date')" disabled
                     :model-value="modelValue.contractDate"></FormInput>
        </ion-col>
        <ion-col v-bind="cols">
          <FormInput :label="$t('forms.userContract.global_contract_percent')" disabled
                     :model-value="modelValue.contractPercentage"></FormInput>
        </ion-col>
      </ion-row>

      <ion-row v-if="userContractForm.editing">
        <ion-col class="ion-text-center">
          <ClubButton version="solid" type="submit">
            {{ $t("forms.userContract.save") }}
          </ClubButton>
        </ion-col>
      </ion-row>
    </Form>


  </div>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, PropType } from 'vue';
  import { Form, } from 'vee-validate';
  import { useI18n } from 'vue-i18n';
  import FormInput from '@/components/forms/FormInput.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import FormInputV from '@/components/forms/FormInputV.vue';
  import { User } from '@/@types/User';
  import { SelectOption } from '@/@types/Form';
  import { PackEnum } from '@/@enums/pack.enum';
  import { UserContractForm } from '@/composables/forms/UserContractForm';

  export default defineComponent({
    name: "UserContractForm",
    components: { FormInputV, ClubButton, FormInput, Form },
    props: {
      modelValue: {
        required: true,
        type: Object as PropType<User>
      },
      readonly: Boolean
    },
    setup (props, { emit }) {
      const { t } = useI18n();
      const cols = {
        "sizeLg": 4,
        "sizeMd": 6,
        "size": 12,
      }
      const userContractForm = new UserContractForm({
        dataToWatch: () => props.modelValue,
        emit
      })
      const editable = computed(() => {
        if (props.readonly) {
          return false
        }

        return userContractForm.editing;
      })
      const clubPackOptions: ComputedRef<SelectOption[]> = computed(() => Object.keys(PackEnum).map(key => {
        return {
          text: t("enums.PackEnum." + PackEnum[key]),
          value: PackEnum[key]
        }
      }))

      return {
        cols,
        userContractForm,
        editable,
        clubPackOptions,

      }
    }
  });
</script>

<style scoped>

</style>
