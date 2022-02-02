<template>
  <ion-item class="flex-column ion-margin-bottom form-input">
    <div class="w-100">
      <ion-input class="form-input-condensed text-small" value="Etichetta Nuovo campo"></ion-input>

      <ion-input class="h-0" value="Valore"></ion-input>
    </div>

    <div>
      <ClubButton version="link" icon only-icon icon-name="trash"
                  @click="$emit('removeInput')"
      ></ClubButton>
    </div>

  </ion-item>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import ClubButton from "@/components/ClubButton.vue";

export default defineComponent({
  name: "FormCustomField",
  components: {ClubButton}

});
</script>

<style scoped>

</style>
