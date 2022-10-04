<template>
  <div>
    <ion-row v-if="!readonly">
      <ion-col class="ion-text-right">
        <ClubButton version="outline" @click="userContractForm.toggleEditMode" size="small">
          {{ $t('forms.userContract.edit' + (userContractForm.editing.value ? '_cancel' : '')) }}
        </ClubButton>
      </ion-col>
    </ion-row>


    <Form @submit="userContractForm.onSubmit">
      <h3>{{ $t('forms.userContract.title_contract_club') }}</h3>

      <ion-row class="mb-5">
        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userContract.club_card_number')" :readonly="!editable"
                      v-model="userContractForm.$v.value.clubCardNumber.$model"
                      :error="userContractForm.getError('clubCardNumber')"/>
        </ion-col>
        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userContract.club_pack')" :readonly="!editable"
                      :component="'ion-select'" :options="clubPackOptions"
                      clear-input
                      v-model="userContractForm.$v.value.clubPack.$model"
                      :error="userContractForm.getError('clubPack')"/>
        </ion-col>

        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userContract.club_pack_start_at')"
                      :readonly="!editable"
                      :component="'ion-input'"
                      clear-input
                      type="date"
                      placeholder=""
                      v-model="userContractForm.$v.value.clubPackStartAt.$model"
                      :error="userContractForm.getError('clubPackStartAt')"/>
        </ion-col>
        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userContract.club_pack_end_at')"
                      :readonly="!editable"
                      :component="'ion-input'"
                      clear-input
                      type="date"
                      placeholder=""
                      v-model="userContractForm.$v.value.clubPackEndAt.$model"
                      :error="userContractForm.getError('clubPackEndAt')"/>
        </ion-col>
      </ion-row>

      <h3>{{ $t('forms.userContract.title_contract_global') }}</h3>
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

      <ion-row v-if="userContractForm.editing.value">
        <ion-col class="ion-text-center">
          <ClubButton version="solid" type="submit">
            {{ $t('forms.userContract.save') }}
          </ClubButton>
        </ion-col>
      </ion-row>
    </Form>


  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, PropType } from 'vue'
import { Form } from 'vee-validate'
import { useI18n } from 'vue-i18n'
import FormInput from '@/components/forms/FormInput.vue'
import ClubButton from '@/components/ClubButton.vue'
import FormInputV from '@/components/forms/FormInputV.vue'
import { UpdateUserContractDto, User } from '@/@types/User'
import { SelectOption } from '@/@types/Form'
import { PackEnum } from '@/@enums/pack.enum'
import { useUserContractForm } from '@/composables/forms/UserContractForm'
import { HttpPlugin } from '@/plugins/HttpPlugin'

export default defineComponent({
  name: 'UserContractForm',
  components: { FormInputV, ClubButton, FormInput, Form },
  props: {
    modelValue: {
      required: true,
      type: Object as PropType<User>
    },
    readonly: Boolean
  },
  setup (props, { emit }) {
    const { t } = useI18n()
    const http = inject('http') as HttpPlugin
    const cols = {
      'sizeLg': 4,
      'sizeMd': 6,
      'size': 12
    }

    const userContractForm = useUserContractForm(computed(() => Object.assign({}, props.modelValue, {
      clubPackStartAt: props.modelValue.clubPackHistory[0]?.startsAt,
      clubPackEndAt: props.modelValue.clubPackHistory[0]?.endsAt
    })))

    const editable = computed(() => {
      if (props.readonly) {
        return false
      }

      return userContractForm.editing.value
    })

    const clubPackOptions: ComputedRef<SelectOption[]> = computed(() => Object.keys(PackEnum).map(key => {
      return {
        text: t('enums.PackEnum.' + PackEnum[key]),
        value: PackEnum[key]
      }
    }))

    userContractForm.registerOnSubmit(async () => {
      const result = await http.api.users.update<UpdateUserContractDto & { clubPackHistory: any[] }>(userContractForm.getFormData(), props.modelValue._id)

      if (result) {
        result.clubPackStartAt = result.clubPackHistory[0].startsAt
        result.clubPackEndAt = result.clubPackHistory[0].endsAt

        emit('update:modelValue', result)

        userContractForm.toggleEditMode(false)
      }
    })

    return {
      cols,
      userContractForm,
      editable,
      clubPackOptions

    }
  }
})
</script>

<style scoped>

</style>
