<template>
  <ion-input ref="currencyElement" v-model="formattedValue"
             @keydown="onKeydown"
             @input="onInput"
             @ionInput="onIonInput"/>
</template>

<script lang="ts" setup>
  import {  onMounted, ref } from 'vue';
  // @ts-ignore
  import Cleave from 'cleave.js';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const props = withDefaults(defineProps<{
    modelValue?: number;
    clearInput?: boolean;
    disabled?: boolean;
    placeholder?: string;
  }>(), {});

  // const emit = defineEmits(['ionInput']);

  const currencyElement = ref(null);
  const numValue = ref(null);
  const formattedValue = ref('');
  // let cleaveInstance;

  // const instance = getCurrentInstance();

  /* watch(() => props.modelValue, (value) => {
     numValue.value = value;
     cleaveInstance.setRawValue(value);
   });*/

  function onIonInput (el) {
    const value = el.target.value.toString();
    const formatter = new Cleave.NumeralFormatter(
        ',',//numeralDecimalMark,
        null,//numeralIntegerScale,
        null,//numeralDecimalScale,
        null,//numeralThousandsGroupStyle,
        true,//numeralPositiveOnly,
        true,//stripLeadingZeroes,
        null,//prefix,
        null,//signBeforePrefix,
        null,//tailPrefix,
        '.'//delimiter{
    );

    setTimeout(() => {
      const lastIsDecimalSign = ['.', ','].includes(value[value.length - 1]);
      let newVal = formatter.format(value);

      if (lastIsDecimalSign) {
        newVal += ',';
      }

      numValue.value = formatter.format(value);
      formattedValue.value = newVal;

      console.log('onIonInput', formattedValue.value);
    });
  }

  function onKeydown () {
//
  }

  function onInput () {
    /* const value = el.target.value;
     const formatter = new Cleave.NumeralFormatter({
       numeral: true,
     });

     setTimeout(() => {
       numValue.value = formatter.format(value);
       formattedValue.value = formatter.format(value);

       console.log('onInput', formattedValue.value);
     });*/
  }

  onMounted(async () => {
    // const elInput: HTMLInputElement = await currencyElement.value.$el.getInputElement();

    /*cleaveInstance = new Cleave(elInput, {
      numeral: true
    });

    elInput.addEventListener('input', (e) => {

      numValue.value = cleaveInstance.getRawValue();
      formattedValue.value = cleaveInstance.getFormattedValue();
      elInput.value = formattedValue.value;
      console.log(numValue, formattedValue);

      //emit('ionInput', numValue.value);
    });*/
  });

</script>
