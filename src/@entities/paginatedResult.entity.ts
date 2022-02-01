import { PaginatedResult } from '@/@types/Pagination';
import { Ref, ref, unref } from 'vue';

export class PaginatedResultEntity<T> {
  private _page: Ref<number> = ref(1);
  private _perPage: Ref<number> = ref(30);
  private _sortBy: Ref<string[]> = ref([]);
  private _order: Ref<"ASC" | "DESC"> = ref("ASC");
  private _totalPages: Ref<number> = ref(0);
  private _totalItems: Ref<number> = ref(0);
  private _data: Ref<T[]> = ref([]);
  private _filter: Ref<any> = ref({});
  private _query: Ref<any> = ref({})
  private _limit: Ref<number> = ref(0);
  
  constructor (data?: T[]) {
    if (data) {
      this._data.value = data
    }
  }
  
  public merge (data?: PaginatedResult) {
    if (!data) {
      return
    }
    
    Object.keys(data).forEach(key => {
      const keyToSearch = "_" + key;
      
      if (this[keyToSearch]) {
        this[keyToSearch].value = data[key]
      }
    })
  }
  
  get page () {return unref(this._page)}
  
  get perPage () {return unref(this._perPage)}
  
  get sortBy () {return unref(this._sortBy)}
  
  get order () {return unref(this._order)}
  
  get totalPages () {return unref(this._totalPages)}
  
  get totalItems () {return unref(this._totalItems)}
  
  get data () {return unref(this._data)}
  
  get filter () {return unref(this._filter)}
  
  get query () {return unref(this._query)}
  
  get limit () {return unref(this._limit)}
}
