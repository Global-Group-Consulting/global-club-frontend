import { OrderStatusEnum } from '@/@enums/order.status.enum';
import { useI18n } from 'vue-i18n';
import { MovementTypeEnum } from '@/@enums/movement.type.enum';
import { PackEnum } from '@/@enums/pack.enum';
import { UserRoleEnum } from '@/@enums/user.role.enum';

export function formatOrderStatus (status?: OrderStatusEnum) {
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
