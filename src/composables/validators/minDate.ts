import { helpers } from '@vuelidate/validators'
import { formatLocaleDate } from '@/@utilities/dates'
import { i18n } from '@/plugins/I18n'

/**
 * @param {String | Ref<String>} minValue
 * @returns {function(Array|Object|String): boolean}
 */
function minDate (minValue) {
  return value => !helpers.req(value) || new Date(value) > new Date(minValue)
}

export default function (minValue) {
  return {
    $validator: minDate(minValue),
    $message: ({ $params }) => i18n.global.t('validations.minDate', { minValue: formatLocaleDate($params.minValue, true) }),
    $params: { minValue, type: 'minDate' }
  }
}




