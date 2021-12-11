import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import { UpdateUserAnagraphicDto } from '@/@types/User';
import * as yup from "yup";
import { FormContext } from 'vee-validate';
import { snakeCase } from 'lodash';

export class UserAnagraphicForm extends BasicForm<UpdateUserAnagraphicDto> {
  protected schema: Partial<Record<keyof UpdateUserAnagraphicDto, YupSchema>> = {};
  protected form!: FormContext<UpdateUserAnagraphicDto>
  private readonly userId: string | null = null;
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: "forms.userContract",
      i18nKeyTransformer: snakeCase
    }, settings));
  
    this.schema = {
      firstName: yup.string().required().min(3),
      lastName: yup.string().required().min(3),
    }
  
    this.userId = settings.dataToWatch ? settings.dataToWatch()._id : null;
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: UpdateUserAnagraphicDto) {
    const result = await this.apiCalls.api.users.update<UpdateUserAnagraphicDto>(values, this.userId);
    
    if (result) {
      this.afterValidSubmit(result);
    }
  }
  
}
