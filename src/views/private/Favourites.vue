<template>
  <IonPage>
    <TopToolbar include-back>Preferiti</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <ion-row v-if="!noProducts">
          <ion-col size-lg="3" size-md="4" size-sm="6" size-xs="6" size="12"
                   v-for="product of productsList"
                   :key="product._id">
            <PrivateProductCardItem :product="product" class="m-0 h-100"/>
          </ion-col>
        </ion-row>

        <NoData v-else text="Nessun prodotto salvato nei preferiti.">
        </NoData>
      </ion-grid>

    </IonContent>
  </IonPage>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent} from "vue";
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import PrivateProductCardItem from '@/components/lists/products/PrivateProductCardItem.vue';
  import { Product } from '@/@types/Product';
  import NoData from '@/components/NoData.vue';

  export default defineComponent({
    name: "WishList",
    components: { NoData, PrivateProductCardItem, TopToolbar },
    setup () {
      // const http = inject('http') as HttpPlugin;
      const store = useStore(storeKey)
      const productsList: ComputedRef<Product[]> = computed(() => store.getters["favourites/products"]);

      const noProducts = computed(() => productsList.value?.length === 0);

      return {
        productsList,
        noProducts
      }
    },
  });
</script>


<style>

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
padding-left: 30px;
padding-right: 75px;
}

</style>
