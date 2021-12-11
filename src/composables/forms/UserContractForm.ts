import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import { UpdateUserContractDto, User } from '@/@types/User';
import * as yup from "yup";
import { PackEnum } from '@/@enums/pack.enum';
import { FormContext } from 'vee-validate';
import { snakeCase } from 'lodash';

export class UserContractForm extends BasicForm<UpdateUserContractDto> {
  protected schema: Partial<Record<keyof User, YupSchema>> = {};
  protected form!: FormContext<UpdateUserContractDto>
  private readonly userId: string | null = null;
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: "forms.userContract",
      i18nKeyTransformer: snakeCase
    }, settings));
  
    this.schema = {
      clubCardNumber: yup.string().min(5),
      clubPack: yup.string().required().oneOf(Object.values(PackEnum))
    }
  
    this.userId = settings.dataToWatch ? settings.dataToWatch()._id : null;
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: UpdateUserContractDto) {
    const result = await this.apiCalls.api.users.update<UpdateUserContractDto>(values, this.userId);
    
    if (result) {
      this.afterValidSubmit(result);
    }
  }
  
}
