import { PaginatedResult, PaginationOrderEnum } from '@/@types/Pagination';
import { omit } from 'lodash';

export class PaginationData implements Partial<PaginatedResult> {
  page!: number;
  perPage!: number;
  sortBy!: string[];
  order!: PaginationOrderEnum;
  totalPages!: number;
  totalItems!: number;
}

export class PaginatedResultData {
  fields!: PaginationData & { data: any };
  
  constructor (data: PaginatedResult) {
    if (!this.fields) {
      this.fields = {
        ...new PaginationData(),
        data: null
      }
    }
    
    // devo mappare i dati della paginazione in caso di paginazione laravel
    if (data['current_page']) {
      this.fields.page = data['current_page']
      this.fields.perPage = data['per_page']
      this.fields.totalPages = data['last_page']
      this.fields.totalItems = data['total']
      // this.fields.sortBy = [];
      // this.fields.order = PaginationOrderEnum.ASC;
    }
    
    Object.assign(this.fields, data);
  }
  
  get data () {
    return this.fields.data
  }
  
  get paginationData () {
    return omit(this.fields, ["data"])
  }
}
