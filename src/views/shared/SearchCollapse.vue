<template>


<div class="scrolling">

       <div class="search-slots">
            <ion-chip class="chip-searchbar">
              <ion-label>Viaggi</ion-label>
            </ion-chip>
        </div>

       <div class="search-slots">
            <ion-chip class="chip-searchbar">
              <ion-label>Elettronica</ion-label>
            </ion-chip>
        </div>

       <div class="search-slots">
            <ion-chip class="chip-searchbar">
              <ion-label>Cassa</ion-label>
            </ion-chip>
        </div>

        <div class="search-slots">
            <ion-chip class="chip-searchbar">
              <ion-label>Cura della persona</ion-label>
            </ion-chip>
        </div>
        
      </div>


</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "SearchCollapse",
  setup() {
    return {}
  },
});
</script>


<style>

.scrolling {
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  
}

::-webkit-scrollbar {
  display: none!important;;
}

.search-slots {
  display: inline-block;
  border-top: 1px solid #cbcbcb;
  padding: 14px 0 14px 0;
}

.search-slots :hover {
  background-color: #967d4a;
  color: white;
}

.chip-searchbar{
  background-color:#b9a06e;
}
</style>
