import { helpers } from '@vuelidate/validators'
import { i18n } from '@/plugins/I18n'

/**
 * @param {Number | Ref<Number>} list
 * @returns {function(Array|Object|String): boolean}
 */
function oneOf (list) {
  return value => {
    return !helpers.req(value) || (list ? list.includes(value) : false)
  }
}

export default function (list) {
  return {
    $validator: oneOf(list),
    $message: ({ $params }) => i18n.global.t('validations.oneOf', { value: $params.list.join(',') }),
    $params: { list, type: 'oneOf' }
  }
}




