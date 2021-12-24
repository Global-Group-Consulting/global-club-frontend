<template>
<div class="logo-container"></div>
    <ul>
      <li>
         <input type="checkbox" checked />
         <div class="search-container">
          <ion-searchbar placeholder="Cosa desideri cercare"></ion-searchbar>
          <btn
          @click="setOpen(true, $event)"
          fill="clear"
          size="small"
          shape="round"
          slot="icon-only"
          icon-name="filter">
          </btn>
        </div>
       <p style="margin: 0px;"><SearchCollapse></SearchCollapse></p>
      </li>
    </ul>

</template>
<script lang="ts">
import { ProductCategoryApis } from "@/plugins/httpCalls/ProductCategoryApis";
import SearchCollapse from '../shared/SearchCollapse.vue';
import { defineComponent, inject, onMounted, ref } from "vue";
import AutoComplete from "../../components/AutoComplete.vue";
import { ProductCategory } from "@/@types/ProductCategory";
import { AlertsPlugin } from "@/plugins/Alerts";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "SearchBar",
  components: { AutoComplete: AutoComplete as any,SearchCollapse,},
  setup () {
    const alerts: AlertsPlugin = inject<AlertsPlugin>("alerts") as AlertsPlugin;

    const options = ref<ProductCategory[]>([]);
    const optionsKey = ref("title");
    const selected = ref({});
    const isOpenRef = ref(false);
    const event = ref();

    const getData = async () => {
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
    });
    const setOpen = (state: boolean, ev?: Event) => {
      event.value = ev;
      isOpenRef.value = state;
    };

    return {
      options,
      selected,
      optionsKey,
      isOpenRef,
      setOpen,
      event
    };
  },
});


</script>

<style>

.sc-ion-searchbar-md-h {
  border-radius: 20px;
  --box-shadow: none !important;
  padding-bottom: 3px;
}

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
  align-items: center;
  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
  background-color: white;
  border-radius: 15px;
  
}

ul {
  list-style: none;
  padding: 0;
  background-color: #fff;
  border-radius: 20px;
}

ul li {
  position: relative;
  padding: 0;
  margin: 0;
}

 input[type="checkbox"] {
    position: absolute;
    cursor: pointer;
    width: 17%;
    height: 66%;
    z-index: 1;
    opacity: 0;
    margin-left: 130px;
}

ul li input[type="checkbox"]:checked ~ p {
  margin-top: 0;
  max-height: 0;
  opacity: 0;
}

</style>
