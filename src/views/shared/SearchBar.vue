<template>
  <div>
    <div class="search-bar-wrapper">
      <IonSearchbar placeholder="Cosa desideri cercare"
                    :value="activeFilters[mainField]"
                    @ionInput="activeFilters[mainField] = $event.currentTarget.value"
                    inputmode="search"
                    enterkeyhint="Cerca"
                    @keydown.enter="onEnterDown"

      ></IonSearchbar>

      <ClubButton class="search-advanced-btn mx-3" version="link">
        <Icon name="filter"></Icon>
      </ClubButton>
    </div>

    <div v-if="hasFilters" class="mt-3">
      <ion-chip v-for="filter in filtersChips" :key="filter.field"
                color="primary" @click="onChipClick(filter)">
        Titolo:&nbsp;<strong>{{ filter.value }}</strong>

        <ion-icon name="close-circle"></ion-icon>
      </ion-chip>
    </div>
  </div>
</template>

<script lang="ts">
  import { computed, ComputedRef, defineComponent, inject, PropType, Ref, ref, watch } from "vue";
  import { AlertsPlugin } from "@/plugins/Alerts";
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import ClubButton from '@/components/ClubButton.vue';
  import Icon from '@/components/Icon.vue';
  import { useRouter } from 'vue-router';
  import { IonSearchbar } from '@ionic/vue';

  export type SearchFilters = Record<string, string | number>;

  interface FiltersChip {
    field: string;
    value: string | number;
  }

  export default defineComponent({
    name: "SearchBar",
    components: { Icon, ClubButton },
    props: {
      filters: Object as PropType<SearchFilters>,
      mainField: {
        type: String,
        default: "title"
      }
    },
    emits: ["update:filters"],
    setup (props, { emit }) {
      const activeFilters: Ref<SearchFilters> = ref({
        [props.mainField]: ""
      })
      const hasFilters = computed(() => props.filters && Object.keys(props.filters).length > 0);
      const filtersChips: ComputedRef<FiltersChip[]> = computed(() => {
        if (!hasFilters.value || !props.filters) {
          return []
        }

        return Object.entries(props.filters).reduce((acc, curr) => {
          acc.push({
            field: curr[0],
            value: curr[1]
          })

          return acc;
        }, [] as FiltersChip[])
      })

      watch(() => props.filters, (filters: SearchFilters | undefined) => {
        // must remove the reference
        filters && (activeFilters.value = { ...filters })
      }, { immediate: true, deep: true });

      function emitUpdate () {
        const toEmit: SearchFilters = Object.entries(activeFilters.value).reduce((acc, entry) => {
          const value = entry[1];

          if (value) {
            acc[entry[0]] = entry[1];
          }

          return acc
        }, {})

        // emits only fields that have a value
        emit("update:filters", toEmit)
      }

      async function onEnterDown (e: KeyboardEvent) {
        const searchInput: HTMLIonSearchbarElement = e.currentTarget as HTMLIonSearchbarElement;

        activeFilters.value[props.mainField] = searchInput.value as string;

        emitUpdate()
      }

      function onChipClick (filter: FiltersChip) {
        activeFilters.value[filter.field] = "";
        emitUpdate()
      }

      return {
        hasFilters,
        onEnterDown, onChipClick,
        activeFilters, filtersChips
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
