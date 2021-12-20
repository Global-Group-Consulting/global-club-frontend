<template>
  <IonPage> 
    <div class="header-nav"> 
      <TopToolbar include-back>Risultato ricerca</TopToolbar>
        </div>
      
     <IonContent class="ion-padding">    
     <!-- <div class="search-container">
        <div v-if="options.length">
          <AutoComplete :options="options" :optionsKey="optionsKey" @save-option="saveResult"/>
        </div>
        <btn
            class="filter"
            @click="setOpen(true, $event)"
            fill="clear"
            size="small"
            shape="round"
            slot="icon-only"
            icon-name="filter"
        ></btn>
        <ion-popover
            :is-open="isOpenRef"
            css-class="my-custom-class"
            :event="event"
            :translucent="true"
            @didDismiss="setOpen(false)">
          <Popover></Popover>
        </ion-popover>
      </div> -->
      <SearchBar></SearchBar>

     <ion-grid>
      <ion-row class="ion-text-start">
          <ion-col>
            <ClubButton size="small" icon icon-position="end">Categoria</ClubButton>
            <ClubButton size="small" icon icon-position="end" style="padding-left:15px;">Prezzo da</ClubButton>
        </ion-col>
          </ion-row>
          <br>
      <ion-row>
       <ion-col size-lg="3" size-md="4" size-sm="6" size-xs="6" size="12">
       <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-router-link href="http://localhost:8100/product"><ion-icon class="top-left" src="./assets/icons/circle-right.svg"></ion-icon></ion-router-link>
           <ion-icon class="bottom-right" src="./assets/WishListBtn.svg"></ion-icon>
          </div>
        </ion-col>
    <ion-col size-lg="3" size-md="4" size-sm="6" size-xs="6" size="12">
     <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-router-link href="http://localhost:8100/product"><ion-icon class="top-left" src="./assets/icons/circle-right.svg"></ion-icon></ion-router-link>
           <ion-icon class="bottom-right" src="./assets/WishListBtn.svg"></ion-icon>
          </div>
    </ion-col>
    <ion-col size-lg="3" size-md="4" size-sm="6" size-xs="6" size="12">
      <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-router-link href="http://localhost:8100/product"><ion-icon class="top-left" src="./assets/icons/circle-right.svg"></ion-icon></ion-router-link>
           <ion-icon class="bottom-right" src="./assets/WishListBtn.svg"></ion-icon>
          </div>
    </ion-col>
    <ion-col size-lg="3" size-md="4" size-sm="6" size-xs="6" size="12">
      <div class="container">
          <img class="img-prodotto" src="/assets/icons/prodotto.jpg">
         <ion-router-link href="http://localhost:8100/product"><ion-icon class="top-left" src="./assets/icons/circle-right.svg"></ion-icon></ion-router-link>
           <ion-icon class="bottom-right" src="./assets/WishListBtn.svg"></ion-icon>
          </div>
    </ion-col>
    
  </ion-row>
</ion-grid>


     </IonContent>
    </IonPage>
</template>

<script lang="ts">
 
  import { defineComponent } from 'vue';
  import ClubButton from '@/components/ClubButton.vue';
  import SearchBar from '@/views/shared/SearchBar.vue';


  export default defineComponent({
    name: "Search",
    components: {  ClubButton, SearchBar },
  //  setup () {
  
  //  }
   });
</script>

<style>

.searchbar-input {
  max-width: 30rem;
  --background: white;
  --border-radius: 15px;
}

.searchbar-input.sc-ion-searchbar-md {
  color: #ada9a4;
  font-size: 14px;
  text-align: left;
} 

.search-container {
  display: flex;
  justify-content: center;
  align-items: left;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 15px;
  max-width: 31rem;
}

.img-prodotto{
    border-radius: 20px;
    height: auto;
    width: 100%;
}


.container {
  position: relative;
}

.top-left {
  position: absolute;
  bottom:15px;
  right: 15px;
  font-size: 18px;
}


.bottom-right{
  position: absolute;
  top: 8px;
  left: 16px;
  font-size: 18px;
}


.header-nav{
color: white;
padding: 15px 75px 0 30px;
}

</style>