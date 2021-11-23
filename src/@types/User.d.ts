import { UserAclRolesEnum } from '@/@enums/user.acl.roles.enum';
import { UserRoleEnum } from '@/@enums/user.role.enum';

export interface User {
  'firstName': string;
  'lastName': string;
  'email': string;
  'account_status': string;
  'created_at': string;
  'updated_at': string;
  'id': string;
  '_id': string;
  'contractNumber': string;
  'role': number;
  'personType': number;
  'birthCity': string;
  'birthCountry': string;
  'birthProvince': string;
  'businessName': string;
  'docNumber': string;
  'docType': number;
  'fiscalCode': string;
  'gender': string;
  'vatNumber': string;
  'contractPercentage': number;
  'mobile': string;
  'phone': string;
  'superAdmin': boolean;
  'lastChangedBy': string;
  'roles': UserAclRolesEnum[];
  'referenceAgentData': null;
  'hasSubAgents': false;
  'permissions': string[];
}

export class UserBasic {
  id?: string;
  _id?: string;
  clubPack: PackEnum;
  gold: boolean;
  email: string;
  firstName: string;
  lastName: string;
  referenceAgent: string;
  
  role: UserRoleEnum;
  roles: string[];
  
  superAdmin: boolean
}


export interface ReadUserGroupsDto {
  _id: UserRoleEnum;
  count: number;
}
