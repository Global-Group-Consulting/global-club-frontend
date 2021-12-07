<template>
  <div>
    <ion-row v-if="!readonly">
      <ion-col class="ion-text-right">
        <ClubButton version="outline" @click="userAnagraphicForm.onEditClick" size="small">
          {{ $t("forms.userAnagraphic.edit" + (userAnagraphicForm.editing ? "_cancel" : '')) }}
        </ClubButton>
      </ion-col>
    </ion-row>


    <Form @submit="userAnagraphicForm.onSubmit">
      <!--      <h3>{{ $t("forms.userAnagraphic.title_contract_club") }}</h3>-->
      <ion-row>
        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userAnagraphic.first_name')" :readonly="!userAnagraphicForm.editing"
                      v-model="userAnagraphicForm.formData.firstName.modelValue"
                      :error="userAnagraphicForm.formData.firstName.errorMessage"/>
        </ion-col>
        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userAnagraphic.last_name')" :readonly="!userAnagraphicForm.editing"
                      v-model="userAnagraphicForm.formData.lastName.modelValue"
                      :error="userAnagraphicForm.formData.lastName.errorMessage"/>
        </ion-col>
      </ion-row>

      <ion-row class="mb-5">
        <ion-col v-bind="cols">
          <FormInputV :label="$t('forms.userAnagraphic.email')" disabled
                      :model-value="modelValue.email"/>
        </ion-col>

      </ion-row>


      <ion-row v-if="userAnagraphicForm.editing">
        <ion-col class="ion-text-center">
          <ClubButton version="solid" type="submit">
            {{ $t("forms.userAnagraphic.save") }}
          </ClubButton>
        </ion-col>
      </ion-row>
    </Form>


  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { User } from '@/@types/User';
  import ClubButton from '@/components/ClubButton.vue';
  import { UserAnagraphicForm } from '@/composables/forms/UserAnagraphicForm';
  import FormInputV from '@/components/forms/FormInputV.vue';

  export default defineComponent({
    name: "UserAnagraphicForm",
    components: { FormInputV, ClubButton },
    props: {
      modelValue: {
        required: true,
        type: Object as PropType<User>,
      },
      readonly: Boolean
    },
    setup (props, { emit }) {
      const cols = {
        "sizeLg": 4,
        "sizeMd": 6,
        "size": 12,
      }
      const userAnagraphicForm = new UserAnagraphicForm({
        dataToWatch: () => props.modelValue,
        emit
      })

      return {
        cols,
        userAnagraphicForm
      }
    }
  });
</script>

<style scoped>

</style>
