<template>
  <IonPage>
      <div class="header-nav"> 
            <TopToolbar include-back>Account personale</TopToolbar>
            </div>
    <IonContent class="ion-padding">

      <Tabs></Tabs>
    
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import Tabs from './Tabs.vue';
import { defineComponent} from "vue";
export default defineComponent({
  name: "PersonalData",
  components: {Tabs},
setup() {
 
  }
  
});
</script>
<style>

.btn-tabs {
background-color: #1e1e1e;
border-radius: 20px;
}

.btn-hover:hover{
  background-color:#ab8e54;
  border-radius: 20px;
}

.btn-hover:hover{
  background-color:#ab8e54;
  border-radius: 20px;
}

.header-nav{
color: white;
padding-left: 30px;
padding-right: 75px;
}

</style>