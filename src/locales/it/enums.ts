import { UserRoleEnum } from '@/@enums/user.role.enum';
import { OrderStatusEnum } from '@/@enums/order.status.enum';
import { formatOrderStatus } from '@/@utilities/statuses';

export const enums = {
  UserRoleEnum: {
    [UserRoleEnum[UserRoleEnum.AGENTE]]: "Agente",
    [UserRoleEnum[UserRoleEnum.CLIENTE]]: "Cliente",
    [UserRoleEnum[UserRoleEnum.SERV_CLIENTI]]: "Servizio clienti",
    [UserRoleEnum[UserRoleEnum.ADMIN]]: "Admin",
  },
  OrderStatusEnum: {
    [OrderStatusEnum.PENDING]: "In attesa",
    [OrderStatusEnum.IN_PROGRESS]: "In lavorazione",
    [OrderStatusEnum.COMPLETED]: "Completato",
    [OrderStatusEnum.CANCELLED]: "Annullato",
  }
}
