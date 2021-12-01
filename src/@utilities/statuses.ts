import { OrderStatusEnum } from '@/@enums/order.status.enum';
import { useI18n } from 'vue-i18n';
import { MovementTypeEnum } from '@/@enums/movement.type.enum';

export function formatOrderStatus (status: OrderStatusEnum) {
  if (!status) {
    return ""
  }
  
  const { t } = useI18n()
  
  return t("enums.OrderStatusEnum." + status)
}

export function formatMovementType (movement: MovementTypeEnum) {
  if (!movement) {
    return ""
  }
  
  const { t } = useI18n()
  
  return t("enums.MovementTypeEnum." + movement)
}
