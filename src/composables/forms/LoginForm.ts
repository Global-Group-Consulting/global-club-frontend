import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import * as yup from "yup";
import { FormContext } from 'vee-validate';
import { snakeCase } from 'lodash';
import { LoginDto } from '@/@types/Login';
import { inject } from 'vue';
import { AuthPlugin } from '@/plugins/AuthPlugin';

export class LoginForm extends BasicForm<LoginDto> {
  protected schema: Partial<Record<keyof LoginDto, YupSchema>> = {};
  protected form!: FormContext<LoginDto>
  protected auth!: AuthPlugin;
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: "forms.login",
      i18nKeyTransformer: snakeCase
    }, settings));
    
    this.schema = {
      email: yup.string().email().required().min(3),
      password: yup.string().required().min(3),
    }
    this.auth = inject("auth") as AuthPlugin;
    
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: LoginDto) {
    
    try {
      await this.auth.login({ ...values });
  
      this.afterValidSubmit();
    } catch (e) {
      await this.alerts.error(e);
    }
  }
  
}
