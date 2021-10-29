import { BasicApisClass } from '@/plugins/httpCalls/basicApisClass';
import { ReadUserGroupsDto, User } from '@/@types/User';
import { UserRoleEnum } from '@/@enums/user.role.enum';
import { PaginatedResult } from '@/@types/Pagination';

export type UserGroup = { id: UserRoleEnum; data: User[] }

export class UserApis extends BasicApisClass {
  static baseUrl = super.baseUrl + 'club/users';
  
  static async readAll (group: UserRoleEnum, page: number): Promise<PaginatedResult<User[]> | undefined> {
    const result = await this.withLoader<PaginatedResult<User[]>>("get", this.getUrl(), {
      params: {
        filter: [
          "role:+" + group,
        ],
        page
      }
    });
    
    return result?.data;
  }
  
  static async readGroups (): Promise<ReadUserGroupsDto[] | undefined> {
    const result = await this.withLoader<ReadUserGroupsDto[]>("get", this.getUrl("/groups"));
    
    return result?.data;
  }
  
  /*
  static async read (id: string): Promise<Product | undefined> {
    const result = await this.withLoader<Product>("get", this.getUrl('/' + id))
    
    return result?.data
  }
  
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
