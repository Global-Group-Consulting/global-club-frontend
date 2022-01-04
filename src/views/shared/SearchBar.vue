<template>
  <div class="search-bar-wrapper">
    <IonSearchbar placeholder="Cosa desideri cercare"
                  v-model.lazy="searchValue"
                  inputmode="search"
                  enterkeyhint="Cerca"
                  @keydown.enter="onEnterDown"
    ></IonSearchbar>

    <ClubButton class="search-advanced-btn mx-3" version="link">
      <Icon name="filter"></Icon>
    </ClubButton>
  </div>
</template>

<script lang="ts">
  import { ProductCategoryApis } from "@/plugins/httpCalls/ProductCategoryApis";
  import { defineComponent, inject, onMounted, Ref, ref } from "vue";
  import { ProductCategory } from "@/@types/ProductCategory";
  import { AlertsPlugin } from "@/plugins/Alerts";
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import ClubButton from '@/components/ClubButton.vue';
  import Icon from '@/components/Icon.vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: "SearchBar",
    components: { Icon, ClubButton },
    setup () {
      const router = useRouter();
      const alerts: AlertsPlugin = inject<AlertsPlugin>("alerts") as AlertsPlugin;
      const http = inject("http") as HttpPlugin;
      const searchValue: Ref<string> = ref("");

      /* const options = ref<ProductCategory[]>([]);
       const optionsKey = ref("title");
       const selected = ref({});
       const isOpenRef = ref(false);
       const event = ref();*/

      /*const getData = async () => {
        try {
          await ProductCategoryApis?.readAll().then((resp) => {
            options.value = (resp as never[]) ?? [];
          });
        } catch (error) {
          alerts.error(error);
        }
      };
      onMounted(async () => {
        getData();
      });*/

      /*   const setOpen = (state: boolean, ev?: Event) => {
           event.value = ev;
           isOpenRef.value = state;
         };
   */
      function onEnterDown () {
        console.log("call search api from the server", searchValue.value)

        router.push({
          name: "private.products",
          query: {
            search: searchValue.value
          }
        })
      }

      return {
        searchValue,
        onEnterDown
        /* options,
         selected,
         optionsKey,
         isOpenRef,
         setOpen,
         event*/
      };
    },
  });


</script>

<style scoped lang="scss">
  .search-bar-wrapper {
    display: flex;
    border-radius: 20px;
    background-color: white;
    overflow: hidden;
    padding-top: calc(var(--spacer) / 2);
    padding-bottom: calc(var(--spacer) / 2);

    ion-searchbar {
      --background: transparent;
      --placeholder-color: var(--ion-color-secondary-border);
      --box-shadow: none;
      --color: var(--ion-color-secondary);
      padding-top: 0;
      padding-bottom: 0;

      border-right: 1px solid #bdbcb8;
    }

    .search-advanced-btn {
      --padding-start: 8px;
      --padding-end: 8px;
    }
  }

</style>
