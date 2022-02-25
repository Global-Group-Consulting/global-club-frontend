import {SearchFilters} from '@/components/SearchBar.vue';
import {filter} from "lodash";
import {LocationQuery} from "vue-router";
import {useI18n} from "vue-i18n";

export interface FilterChip {
  label: string;
  field: string;
  value: string | string[] | boolean | number;
}

export default () => {
  const {t, te} = useI18n();
  
  function prepareFilters(filters: SearchFilters) {
    return Object.keys(filters).reduce((acc, key) => {
      const value = filters[key];
      
      if (!value) {
        return acc;
      }
      
      acc[`filter[${key}]`] = value;
      
      return acc;
    }, {})
  }
  
  function parseFilters(filters: LocationQuery): FilterChip[] {
    return Object.keys(filters).reduce((acc, key) => {
      const finalKey = key.replaceAll(/(filter\[)|(\])/g, "");
      
      if (filters[key]) {
        const tString = "forms.filters." + finalKey;
        let value: any = filters[key];
        
        if (value === "true") {
          value = true;
        }
        
        acc.push({
          "label": te(tString) ? t(tString) : finalKey,
          "field": finalKey,
          value
        });
      }
      
      return acc;
    }, [] as FilterChip[]);
  }
  
  return {
    prepareFilters,
    parseFilters
  }
}
