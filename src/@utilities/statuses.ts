import { OrderStatusEnum } from '@/@enums/order.status.enum';
import { useI18n } from 'vue-i18n';
import { MovementTypeEnum } from '@/@enums/movement.type.enum';
import { PackEnum } from '@/@enums/pack.enum';
import { UserRoleEnum } from '@/@enums/user.role.enum';

export function formatOrderStatus (status: OrderStatusEnum) {
  if (!status) {
    return ""
  }
  
  const { t } = useI18n()
  
  return t("enums.OrderStatusEnum." + status)
}

export function getOrderStatusColor (status: OrderStatusEnum) {
  if (!status) {
    return ""
  }
  
  const map = {
    [OrderStatusEnum.PENDING]: "#ffe100",
    [OrderStatusEnum.IN_PROGRESS]: "#009dff",
    [OrderStatusEnum.COMPLETED]: "#07c423",
    [OrderStatusEnum.CANCELLED]: "#c71d1d",
  }
  
  return map[status];
}

export function formatMovementType (movement: MovementTypeEnum) {
  if (!movement) {
    return ""
  }
  
  const { t } = useI18n()
  
  return t("enums.MovementTypeEnum." + movement)
}

export function formatClubPack (pack: PackEnum) {
  if (!pack) {
    return "";
  }
  
  const { t } = useI18n();
  
  return t("enums.PackEnum." + pack);
}

export function formatUserRole (role: UserRoleEnum) {
  if (!role) {
    return ""
  }
  
  const { t } = useI18n()
  
  return t("enums.UserRoleEnum." + UserRoleEnum[role])
}

export function formatSemesterId (semesterId: string): string {
  let toReturn = "";
  
  if (!semesterId) {
    return toReturn;
  }
  
  const year = +semesterId.split("_")[0]
  const smtr = +semesterId.split("_")[1]
  
  if (isNaN(year) || isNaN(smtr)) {
    return toReturn
  }
  
  const month = smtr === 1 ? 0 : 6;
  const startDate = new Date(year, month)
  const endDate = new Date(year, month + 6);
  
  if (month === 6) {
    endDate.setMonth(0)
    endDate.setFullYear(year + 1)
  }
  
  endDate.setDate(endDate.getDate() - 1)
  
  toReturn = startDate.toLocaleDateString() + " - " + endDate.toLocaleDateString();
  
  return toReturn
}
