import { UserRoleEnum } from '@/@enums/user.role.enum'
import { OrderStatusEnum } from '@/@enums/order.status.enum'
import { MovementTypeEnum } from '@/@enums/movement.type.enum'
import { PackEnum } from '@/@enums/pack.enum'
import { NotificationTypeEnum } from '@/@enums/notification.type.enum'
import { WalletPremiumMovementEnum } from '@/@enums/wallet.premium.movement.enum'

export const enums = {
  UserRoleEnum: {
    [UserRoleEnum[UserRoleEnum.AGENTE]]: 'Agente',
    [UserRoleEnum[UserRoleEnum.CLIENTE]]: 'Cliente',
    [UserRoleEnum[UserRoleEnum.SERV_CLIENTI]]: 'Servizio clienti',
    [UserRoleEnum[UserRoleEnum.ADMIN]]: 'Admin'
  },
  OrderStatusEnum: {
    [OrderStatusEnum.PENDING]: 'In attesa',
    [OrderStatusEnum.IN_PROGRESS]: 'In lavorazione',
    [OrderStatusEnum.COMPLETED]: 'Completato',
    [OrderStatusEnum.CANCELLED]: 'Annullato'
  },
  MovementTypeEnum: {
    [MovementTypeEnum.DEPOSIT_ADDED]: 'Aggiunta',
    [MovementTypeEnum.DEPOSIT_USED]: 'Utilizzo',
    [MovementTypeEnum.DEPOSIT_REMOVED]: 'Storno',
    [MovementTypeEnum.DEPOSIT_TRANSFERRED]: 'Trasferimento',
    [MovementTypeEnum.INTEREST_RECAPITALIZED]: 'Ricapitalizzazione',
    [MovementTypeEnum.DEPOSIT_RECEIVED_WP]: 'Trasferimento da altro utente',
    [MovementTypeEnum.DEPOSIT_RECEIVED_WP + '_self']: 'Trasferimento verso altro utente',
    [MovementTypeEnum.DEPOSIT_UNLOCKED_WP]: 'Sblocco da Wallet Premium',
    [MovementTypeEnum.DEPOSIT_UNLOCKED_WP + '_self']: 'Sblocco'
  },
  PackEnum: {
    [PackEnum.NONE]: 'Sconosciuto',
    [PackEnum.BASIC]: 'Basic',
    [PackEnum.FAST]: 'Fast',
    [PackEnum.PREMIUM]: 'Premium',
    [PackEnum.UNSUBSCRIBED]: 'Non iscritto'
  },
  NotificationTypeEnum: {
    [NotificationTypeEnum.ORDER_UPDATE]: 'Stato ordine aggiornato',
    [NotificationTypeEnum.NEW_MESSAGE]: 'Nuovo messaggio',
    [NotificationTypeEnum.NEW_NEWS]: 'Nuova news'
  },
  WalletPremiumMovementEnum: {
    [WalletPremiumMovementEnum.INITIAL_DEPOSIT]: 'Deposito iniziale',
    [WalletPremiumMovementEnum.MONTHLY_INCOME]: 'Interesse maturato'
  }
}
