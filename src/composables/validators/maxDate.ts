import { helpers } from '@vuelidate/validators'
import { formatLocaleDate } from '@/@utilities/dates'
import { i18n } from '@/plugins/I18n'

/**
 * @param {String | Ref<String>} minValue
 * @returns {function(Array|Object|String): boolean}
 */
function maxDate (maxValue) {
  return value => !helpers.req(value) || new Date(value) <= new Date(maxValue)
}

export default function (maxValue) {
  return {
    $validator: maxDate(maxValue),
    $message: ({ $params }) => i18n.global.t('validations.maxDate', { maxValue: formatLocaleDate($params.maxValue, true) }),
    $params: { maxValue, type: 'maxDate' }
  }
}




