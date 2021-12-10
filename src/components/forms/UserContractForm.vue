<template>
  <ion-grid class="p-0">
    <ion-row>
      <ion-col>
        <FormInput label="Label dell'input" :readonly="readonly" modelValue="valore del campo"></FormInput>
      </ion-col>
      <ion-col>
        <FormInput label="Label dell'input" :readonly="readonly" modelValue="valore del campo"></FormInput>
      </ion-col>
      <ion-col>
        <FormInput label="Label dell'input" :readonly="readonly" modelValue="valore del campo"></FormInput>
      </ion-col>
    </ion-row>

  </ion-grid>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
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
    }
  });
</script>

<style scoped>

</style>
