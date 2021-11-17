import { createI18n } from 'vue-i18n';
import itMessages from '@/locales/it';

export const SUPPORT_LOCALES = ['en', 'it'];

export type MessageSchema = typeof itMessages

export const i18n = createI18n<MessageSchema[], 'it'>({
  locale: 'it',
  availableLocales: SUPPORT_LOCALES,
  
  globalInjection: true,
  warnHtmlInMessage: 'off',
  warnHtmlMessage: false,
  
  legacy: false,
  messages: {
    'it': itMessages,
    //'en': {},
  }
});
