import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import * as yup from "yup";
import { FormContext } from 'vee-validate';
import { snakeCase } from 'lodash';
import { LoginDto } from '@/@types/Login';
import { AuthPlugin } from '@/plugins/AuthPlugin';
import { inject } from 'vue';

type ForgotPasswordDto = Pick<LoginDto, "email">;

export class ForgotPasswordForm extends BasicForm<ForgotPasswordDto> {
  protected schema: Partial<Record<keyof ForgotPasswordDto, YupSchema>> = {};
  protected form!: FormContext<ForgotPasswordDto>
  protected auth!: AuthPlugin;
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: "forms.login",
      i18nKeyTransformer: snakeCase
    }, settings));
  
    this.schema = {
      email: yup.string().email().required().min(3),
    }
  
    this.auth = inject("auth") as AuthPlugin
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: ForgotPasswordDto) {
    try {
      await this.auth.forgotPassword(values.email)
      this.afterValidSubmit();
    } catch (er) {
      await this.alerts.error(er)
    }
  }
  
}
