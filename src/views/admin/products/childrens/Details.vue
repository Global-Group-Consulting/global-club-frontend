<template>
  <TopToolbar></TopToolbar>

  <ion-grid class="form" fixed>

    <ion-row>
      <ion-col size="4">
        <FormInput label="Titolo"/>

        <FormInput label="Description" type="textarea"/>
      </ion-col>

      <ion-col size="4">
        <FormInput label="Immagini" type="file"/>
        <FormInput label="Anteprima"/>
      </ion-col>

      <ion-col size="4">
        <FormInput label="Prezo"/>
        <FormInput label="Categoria"/>
        <FormInput label="Tags"/>
      </ion-col>
    </ion-row>


  </ion-grid>

</template>

<script lang="ts" setup>
  import Input from '@/components/forms/FormInput.vue';
  import FormInput from '@/components/forms/FormInput.vue';
</script>
