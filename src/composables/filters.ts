import { SearchFilters } from '@/views/shared/SearchBar.vue';

export default () => {
  function prepareFilters (filters: SearchFilters) {
    return Object.keys(filters).reduce((acc, key) => {
      acc[`filter[${key}]`] = filters[key];
      
      return acc;
    }, {})
  }
  
  return {
    prepareFilters
  }
}
