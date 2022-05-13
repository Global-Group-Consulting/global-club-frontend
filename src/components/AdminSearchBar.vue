<template>
  <div>
    <div class="search-bar-wrapper">
      <IonSearchbar :placeholder="placeholder"
                    :value="activeFilters[mainField]"
                    @ionInput="activeFilters[mainField] = $event.currentTarget.value"
                    @ionClear="cancelFilter"
                    inputmode="search"
                    enterkeyhint="Cerca"
                    animated
                    @keydown.enter="submitFilter"
      ></IonSearchbar>

      <div class="position-relative">
        <ClubButton class="search-advanced-btn mx-3" version="link"
                    v-if="hasAdvancedFilters"
                    @click="advancedExpanded = !advancedExpanded">
          <Icon :name="advancedExpanded ? 'chevron-up' : 'filter'"></Icon>
        </ClubButton>

        <Icon color="red" name="star" size="small" v-if="showAdvancedFiltersBadge"
              style="position: absolute; right: 14px; top: 4px"></Icon>
      </div>
    </div>

    <ion-card class="search-bar-advanced-wrapper mt-0" v-if="advancedExpanded && hasAdvancedFilters">
      <ion-card-content>
        <Form @submit="onFormSubmit">
          <slot name="advancedFilters" v-bind:filters="activeFilters"></slot>

          <div>
            <ClubButton version="link" @click="onAdvancedReset">Reset</ClubButton>
            <ClubButton version="outline" @click="onAdvancedSearch">Cerca</ClubButton>
          </div>
        </Form>
      </ion-card-content>
    </ion-card>

    <div v-if="hasFilters" class="mt-3">
      <ion-chip v-for="filter in filterChips" :key="filter.field"
                color="primary" @click="onChipClick(filter)">
        {{ filter.label }}:&nbsp;
        <strong>
          <slot :name="'filterChip_' + filter.field" v-bind:data="filter">{{ filter.value }}</slot>
        </strong>

        <ion-icon name="close-circle"></ion-icon>
      </ion-chip>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, ComputedRef, defineComponent, PropType, ref, watch} from 'vue';
import Icon from "@/components/Icon.vue";
import ClubButton from "@/components/ClubButton.vue";
import {SearchFilters} from "@/components/SearchBar.vue";
import {useRoute, useRouter} from "vue-router";
import filters, {FilterChip} from "@/composables/filters";
import {useForm} from "vee-validate";

export default defineComponent({
  name: "AdminSearchBar",
  components: {Icon, ClubButton},
  props: {
    filters: Object as PropType<SearchFilters>,
    placeholder: {type: String, default: "Cosa desideri cercare"},
    mainField: {type: String, default: "title"},
    hasAdvancedFilters: Boolean
  },
  emits: ["update:filters"],
  setup(props, {emit}) {
    const activeFilters = ref({});
    const advancedExpanded = ref(false);
    const router = useRouter();
    const route = useRoute();
    const {prepareFilters, parseFilters} = filters()
    const {handleSubmit} = useForm();
    const onFormSubmit = handleSubmit(() => submitFilter());

    /**
     * Read the query string from the page url and parse it to create an array of active filters
     * This filterChips are also listened and the activeFilters are updated accordingly
     * @type {ComputedRef<FilterChip[]>}
     */
    const filterChips: ComputedRef<FilterChip[]> = computed(() => parseFilters(route.query));

    /**
     * Based on the filterChips, check if contains some filter based on its keys
     * @type {ComputedRef<boolean>}
     */
    const hasFilters: ComputedRef<boolean> = computed(() => Object.keys(filterChips.value).length > 0);

    const showAdvancedFiltersBadge: ComputedRef<boolean> = computed(() => filterChips.value.filter(chip => chip.field !== props.mainField).length > 0)

    /**
     * Submit the filters
     * @emits Event(update:filters)
     */
    function submitFilter() {
      router.replace({query: prepareFilters(activeFilters.value)});

      emit("update:filters", prepareFilters(activeFilters.value))
    }

    /**
     * Reset all filters
     * @emits Event(update:filters)
     */
    function cancelFilter() {
      // close the advanced filters
      advancedExpanded.value = false;

      router.replace({query: {}});

      emit("update:filters", prepareFilters(activeFilters.value))
    }


    /**
     * When the user clicks on a chip, remove that filter.
     *
     * @param {FilterChip} chip
     */
    function onChipClick(chip: FilterChip) {
      delete activeFilters.value[chip.field];

      submitFilter();
    }

    /**
     * When clicking on the Reset btn inside advanced filters
     */
    function onAdvancedReset() {
      cancelFilter();
    }

    /**
     * When clicking on the Submit btn inside advanced filters
     */
    function onAdvancedSearch() {
      submitFilter();
    }

    // When filterChips changes, update the activeFilters
    // Because the chips are created from the url query string
    watch(() => filterChips.value, value => {
      activeFilters.value = value.reduce((acc, curr) => {
        acc[curr.field] = curr.value;

        return acc;
      }, {})

      submitFilter();

    }, {immediate: true, deep: true})

    return {
      activeFilters, filterChips, hasFilters, showAdvancedFiltersBadge, advancedExpanded,
      submitFilter, cancelFilter, onFormSubmit,
      onChipClick, onAdvancedReset, onAdvancedSearch
    }
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

:deep(.search-bar-advanced-wrapper) {
  margin-left: 20px;
  margin-right: 20px;
  --background: white;
  border-radius: 0 0 20px 20px;

  .form-input-wrapper .form-input {
    --background: var(--ion-color-dark);
    --color: var(--ion-color-secondary);
  }
}
</style>
