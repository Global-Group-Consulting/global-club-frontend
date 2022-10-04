import { computed, inject, isRef, Ref, ref, watch } from 'vue'
import { PackEnum } from '@/@enums/pack.enum'
import useVuelidate from '@vuelidate/core'
import validators from '@/composables/validators'

export function useUserContractForm (data) {
  const editing = ref(false)
  const formData = ref(parseIncomingData(data))
  const rules = computed(() => ({
    clubCardNumber: { minLength: validators.minLength(5) },
    clubPack: { required: validators.required, oneOf: validators.oneOf(Object.values(PackEnum)) },
    clubPackStartAt: { minDate: validators.minDate('2021-01-01'), maxDate: validators.maxDate(new Date().toISOString()) },
    clubPackEndAt: {
      // requiredIf: validators.requiredIf(() => !!formData.value.clubPackStartAt),
      minDate: validators.minDate(formData.value.clubPackStartAt)
    }
  }))
  
  const $v = useVuelidate(rules, formData)
  
  let handleSubmitFn: () => Promise<void>
  
  function parseIncomingData (data) {
    if (data.constructor.name === 'ComputedRefImpl' || isRef(data)) {
      return { ...data.value }
    }
    return { ...data }
  }
  
  function registerOnSubmit (fn: () => Promise<void>) {
    handleSubmitFn = fn
  }
  
  function getError (field): string | undefined {
    if (!field || !(field in $v.value)) {
      return
    }
    
    const errors = $v.value[field].$errors
    
    if (errors.length) {
      return errors[0].$message
    }
    
    return
  }
  
  function getFormData () {
    return formData.value
  }
  
  function toggleEditMode (status: boolean) {
    editing.value = (status && typeof status === 'boolean') ? status : !editing.value
    
    if (!editing.value) {
      $v.value.$reset()
      formData.value = parseIncomingData(data)
    }
  }
  
  async function onSubmit () {
    const isValid = await $v.value.$validate()
    
    if (!isValid) {
      return
    }
    
    await handleSubmitFn()
  }
  
  watch(() => formData.value.clubPackStartAt, (value) => {
    if (!value) {
      return
    }
    
    const date = new Date(value)
    date.setFullYear(date.getFullYear() + 1)
    
    if (!formData.value.clubPackEndAt || $v.value.clubPackEndAt.$dirty) {
      formData.value.clubPackEndAt = date.toISOString()
    }
  }, {
    immediate: true,
    deep: true
  })
  
  watch(() => data, (value) => {
    formData.value = parseIncomingData(value)
  }, {
    immediate: true,
    deep: true
  })
  
  return {
    $v,
    editing,
    getError,
    getFormData,
    registerOnSubmit,
    toggleEditMode,
    onSubmit
  }
}
