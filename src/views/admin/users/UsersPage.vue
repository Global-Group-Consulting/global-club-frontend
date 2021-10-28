<template>
  <IonPage>
    <top-toolbar></top-toolbar>

    <ion-content>
      users page
    </ion-content>
  </IonPage>

</template>

<script>
import TopToolbar from '@/components/toolbars/TopToolbar';
export default {
  name: "UsersPage",
  components: { TopToolbar },
  setup() {
    console.log("running user")

  }
};
</script>

<style scoped>

</style>
