import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import * as yup from "yup";
import { FormContext } from 'vee-validate';
import { snakeCase } from 'lodash';
import { LoginDto } from '@/@types/Login';
import { AuthPlugin } from '@/plugins/AuthPlugin';

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
    
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: ForgotPasswordDto) {
    
    return
  }
  
}
