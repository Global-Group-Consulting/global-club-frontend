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
    
    Object.assign(this.fields, data);
  }
  
  get data () {
    return this.fields.data
  }
  
  get paginationData () {
    return omit(this.fields, ["data"])
  }
}
