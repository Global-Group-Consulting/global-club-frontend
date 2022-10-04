import { UserAclRolesEnum } from '@/@enums/user.acl.roles.enum'
import { UserRoleEnum } from '@/@enums/user.role.enum'
import { AclPermissionsEnum } from '@/@enums/acl.permissions.enum'
import { PackEnum } from '@/@enums/pack.enum'

export interface ClubPackHistory {
  cost?: number;
  endsAt?: string;
  orderId?: string;
  pack: PackEnum;
  startsAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  activated_at: string;
  birthCity: string;
  birthCountry: string;
  birthDate: string;
  birthProvince: string;
  businessAddress: string;
  businessCity: string;
  businessCountry: string;
  businessName: string;
  businessProvince: string;
  businessRegion: string;
  businessZip: string;
  clubCardNumber: string;
  clubPack: PackEnum;
  clubPackChangeOrder: string;
  clubPackHistory: ClubPackHistory[];
  commissionsAssigned: string[];
  contractBic: string;
  contractDate: string;
  contractIban: string;
  contractInitialInvestment: string;
  contractInitialInvestmentGold: string;
  contractInitialPaymentMethod: string;
  contractInitialPaymentMethodOther: string;
  contractNumber: string;
  contractNumberLegacy: string;
  contractPercentage: number;
  contractSignedAt: string;
  docExpiration: string;
  docNumber: string;
  docType: string;
  email: string;
  firstName: string;
  fiscalCode: string;
  gender: string;
  gold: boolean;
  hasSubAgents: boolean;
  lastName: string;
  lastChangedBy: string;
  legalRepresentativeAddress: string;
  legalRepresentativeCity: string;
  legalRepresentativeCountry: string;
  legalRepresentativeProvince: string;
  legalRepresentativeRegion: string;
  legalRepresentativeZip: string;
  mobile: string;
  personType: number;
  permissions: AclPermissionsEnum[];
  phone: string;
  referenceAgent: string;
  referenceAgentData: any;
  role: number;
  roles: UserAclRolesEnum[];
  superAdmin: boolean;
  vatNumber: string;
  verified_at: string;
  
  _id: string;
  id: string;
  created_at: Date;
  updated_at: Date;
}

export class UserBasic {
  _id: string
  clubPack: PackEnum
  clubPackHistory: ClubPackHistory[]
  gold: boolean
  email: string
  firstName: string
  lastName: string
  referenceAgent: string
  
  role: UserRoleEnum
  roles: string[]
  
  superAdmin: boolean
}

export interface ReadUserGroupsDto {
  _id: UserRoleEnum;
  count: number;
}

export type UpdateUserContractDto = Pick<User, 'clubCardNumber' | 'clubPack'> & {
  clubPackStartAt: string;
  clubPackEndAt: string;
}

export type UpdateUserAnagraphicDto = Pick<User, 'firstName' | 'lastName' | 'email'>
