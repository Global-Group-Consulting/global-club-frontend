import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm'
import * as yup from 'yup'
import { FormContext } from 'vee-validate'
import { snakeCase } from 'lodash'
import { AuthPlugin } from '@/plugins/AuthPlugin'
import { inject } from 'vue'

type ActivateAccountDto = {
  password: string;
  passwordConfirmation: string;
};

export class ActivateAccountForm extends BasicForm<ActivateAccountDto> {
  protected schema: Partial<Record<keyof ActivateAccountDto, YupSchema>> = {}
  protected form!: FormContext<ActivateAccountDto>
  protected auth!: AuthPlugin
  
  protected wrapSchema = true
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: 'forms.login',
      i18nKeyTransformer: snakeCase
    }, settings))
    
    // @ts-ignore
    this.schema = {
      password: yup.string().required().min(3),
      passwordConfirmation: yup.string().required().oneOf([yup.ref('password'), null], 'Le password devono combaciare')
    }
    
    this.auth = inject('auth') as AuthPlugin
    this.createFormFields(settings.dataToWatch)
  }
  
  async handleSubmitValid (values: ActivateAccountDto) {
    const queryStrings = new URLSearchParams(window.location.search)
    
    try {
      await this.auth.activateAccount({
        password: values.password,
        // eslint-disable-next-line @typescript-eslint/camelcase
        password_confirmation: values.passwordConfirmation,
        token: queryStrings.get('t')
      })
      this.afterValidSubmit()
    } catch (er) {
      await this.alerts.error(er)
    }
  }
  
}
