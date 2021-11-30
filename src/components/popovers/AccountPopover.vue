<template>
  <ion-content>
    <ion-list>
      <ion-item button>
        <Icon name="user" slot="start" class="me-2"></Icon>
        Account
      </ion-item>

      <ion-item-divider color="secondary">
        <hr>
      </ion-item-divider>

      <ion-item button @click="$auth.logout(); popoverController.dismiss()">
        <Icon name="logout" slot="start" class="me-2"></Icon>
        Logout
      </ion-item>
    </ion-list>
  </ion-content>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { popoverController } from '@ionic/vue';
  import Icon from '@/components/Icon.vue';

  export default defineComponent({
    name: "AccountPopover",
    components: { Icon },
    setup () {

      return {
        popoverController
      }
    }
  });
</script>

