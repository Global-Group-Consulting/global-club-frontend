import oneOf from './oneOf'
import minDate from './minDate'
import maxDate from './maxDate'
import * as validators from '@vuelidate/validators'
import { i18n } from '@/plugins/I18n'

type DefaultRules =
  'required' |
  'requiredIf' |
  'requiredUnless' |
  'minLength' |
  'maxLength' |
  'minValue' |
  'maxValue' |
  'between' |
  'alpha' |
  'alphaNum' |
  'numeric' |
  'integer' |
  'decimal' |
  'email' |
  'ipAddress' |
  'macAddress' |
  'sameAs' |
  'url' |
  'or' |
  'and' |
  'not';

type CustomRules = 'oneOf' | 'minDate' | 'maxDate';
export type ValidationRules = DefaultRules | CustomRules;

const withI18nMessage = validators.createI18nMessage({ t: i18n.global.t.bind(i18n) })

// wrap each validator.
const toExport: Partial<Record<ValidationRules, any>> = {
  oneOf,
  minDate,
  maxDate
}
export const required = withI18nMessage(validators.required)

for (const validator in validators) {
  toExport[validator] = withI18nMessage(validators[validator], { withArguments: true })
}

export default toExport

