import { ValidationRules } from '@/composables/validators'

export const validators: Partial<Record<ValidationRules, string>> = {
  required: 'Il campo è obbligatorio',
  requiredIf: 'Il campo è obbligatorio',
  minDate: `La data deve essere successiva a {minValue}`,
  maxDate: `La data deve essere uguale o inferiore alla data attuale ({maxValue})`,
  minLength: `Il campo deve contenere almeno {min} caratteri`,
  oneOf: `Il valore dovrebbe essere uno dei seguenti: {value}`
}
