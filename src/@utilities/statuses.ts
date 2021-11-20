import { OrderStatusEnum } from '@/@enums/order.status.enum';
import { useI18n } from 'vue-i18n';

export function formatOrderStatus (status: OrderStatusEnum) {
  if (!status) {
    return ""
  }
  
  const { t } = useI18n()
  
  return t("enums.OrderStatusEnum." + status)
}
