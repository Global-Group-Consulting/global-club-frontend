import { UserRoleEnum } from '@/@enums/user.role.enum';

export const enums = {
  UserRoleEnum: {
    [UserRoleEnum[UserRoleEnum.AGENTE]]: "Agente",
    [UserRoleEnum[UserRoleEnum.CLIENTE]]: "Cliente",
    [UserRoleEnum[UserRoleEnum.SERV_CLIENTI]]: "Servizio clienti",
    [UserRoleEnum[UserRoleEnum.ADMIN]]: "Admin",
  }
}
