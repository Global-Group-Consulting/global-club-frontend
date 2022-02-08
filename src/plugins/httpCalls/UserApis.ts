import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { ReadUserGroupsDto, UpdateUserAnagraphicDto, UpdateUserContractDto, User, UserBasic } from '@/@types/User';
import { UserRoleEnum } from '@/@enums/user.role.enum';
import { PaginatedResult } from '@/@types/Pagination';

export type UserGroup = { id: UserRoleEnum; data: User[] }

export class UserApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/users';
  
  static async readAll (group?: UserRoleEnum, page = 1): Promise<PaginatedResult<UserBasic[]> | undefined> {
    const filters = {}
    
    if (group) {
      filters["role"] = group.toString()
    }
    
    const result = await this.withLoader<PaginatedResult<UserBasic[]>>("get", this.getUrl(), {
      params: {
        "sortBy[firstName]": 1,
        "sortBy[lastName]": 1,
        ...this.prepareFilterParams(filters),
        page
      }
    });
    
    return result?.data;
  }
  
  static async readGroups (): Promise<ReadUserGroupsDto[] | undefined> {
    const result = await this.withLoader<ReadUserGroupsDto[]>("get", this.getUrl("/groups"));
    
    return result?.data;
  }
  
  static async readProfile (id: string, full?: boolean): Promise<UserBasic | undefined> {
    const queryParams = {}
  
    if (full !== undefined) {
      queryParams["full"] = full
    }
  
    const result = await this.withLoader<UserBasic>("get", this.getUrl('/' + id, queryParams))
  
    return result?.data
  }
  
  static async update<T>(data: UpdateUserContractDto | UpdateUserAnagraphicDto, id): Promise<T | undefined> {
    const result = await this.withLoader<T>("patch", this.getUrl('/' + id), data);
    
    return result?.data;
  }
  
  static async updatePack(id: string): Promise<void> {
    await this.withLoader("patch", this.getUrl('/' + id + "/pack"));
  }
  
  /*
  static async create (data: CreateProductDto): Promise<Product | undefined> {
    const result = await this.withLoader<Product>("post", this.getUrl(), data);
  
    return result?.data;
  }
  
  static async update (data: UpdateProductDto, id): Promise<Product | undefined> {
    const result = await this.withLoader<Product>("patch", this.getUrl('/' + id), data);
    
    return result?.data;
  }
  
  static async deleteProduct (id: string) {
    const result = await this.withLoader<Product>("delete", this.getUrl(`/${id}`))
    
    return result?.data;
  }
  
  static async deleteFile (productId: string, fileId: string): Promise<Product | undefined> {
    const config = {
      data: {
        filesToDelete: [fileId]
      }
    }
    const result = await this.withLoader<Product>("delete", this.getUrl(`/${productId}/files`), config);
    
    return result?.data;
  }*/
  
}
