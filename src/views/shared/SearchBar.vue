<template>
  <div class="logo-container"></div>
  <div class="search-container">
    <div v-if="options.length">
      <AutoComplete :options="options" :optionsKey="optionsKey" />
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
  </div>

  <div class="searchMenu">
    <ul>
      <li>
        <input type="checkbox" checked /><i class="arrow"></i>
        <div v-if="options.length">
          <AutoComplete :options="options" :optionsKey="optionsKey" />
        </div>
        <p>test</p>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import { ProductCategoryApis } from "@/plugins/httpCalls/ProductCategoryApis";
import { defineComponent, inject, onMounted, ref } from "vue";
import AutoComplete from "../../components/AutoComplete.vue";
import { ProductCategory } from "@/@types/ProductCategory";
import { AlertsPlugin } from "@/plugins/Alerts";
import Icon from "@/components/Icon.vue";

export default defineComponent({
  name: "SearchBar",
  components: { AutoComplete: AutoComplete as any },
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
}

h2 {
  font-size: 18px;
  line-height: 34px;
  font-weight: 500;
  letter-spacing: 1px;
  display: block;
  margin: 0;
  cursor: pointer;
  color: #6c6c6a;
}

ul {
  list-style: none;
  padding: 0px 43px 0px 0px;
  background-color: #fff;
  border-radius: 5px;
}
ul li {
  position: relative;
  padding: 0;
  margin: 0;
  padding-bottom: 4px;
  border-top: 1px dotted #dce7eb;
}

ul li:nth-child(1) {
  border: none;
}
ul li:nth-of-type(1) {
  animation-delay: 0.5s;
}
ul li:nth-of-type(2) {
  animation-delay: 0.75s;
}
ul li:nth-of-type(3) {
  animation-delay: 1s;
}
ul li:last-of-type {
  padding-bottom: 0;
}

ul li .arrow {
  position: absolute;
  transform: translate(-6px, 0);
  margin-top: 16px;
  right: 0;
}
ul li .fas {
  color: #f6483b;
  font-size: 15px;
  margin-right: 10px;
}
ul li .arrow:before,
ul li .arrow:after {
  content: "";
  position: absolute;
  background-color: #f6483b;
  width: 3px;
  height: 9px;
}
ul li .arrow:before {
  transform: translate(-2px, 0) rotate(45deg);
}
ul li .arrow:after {
  transform: translate(2px, 0) rotate(-45deg);
}
ul li input[type="checkbox"] {
  position: absolute;
  cursor: pointer;
  width: 100%;
  height: 100%;
  z-index: 1;
  opacity: 0;
}
ul li input[type="checkbox"]:checked ~ p {
  margin-top: 0;
  max-height: 0;
  opacity: 0;
  transform: translate(0, 50%);
}
ul li input[type="checkbox"]:checked ~ .arrow:before {
  transform: translate(2px, 0) rotate(45deg);
}
ul li input[type="checkbox"]:checked ~ .arrow:after {
  transform: translate(-2px, 0) rotate(-45deg);
}
.transition,
p,
ul li .arrow:before,
ul li .arrow:after {
  transition: all 0.25s ease-in-out;
}

.flipIn,
h1,
ul li {
  animation: flipdown 0.5s ease both;
}
</style>
