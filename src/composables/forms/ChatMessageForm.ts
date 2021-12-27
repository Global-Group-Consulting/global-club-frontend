import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import * as yup from "yup";
import { FormContext } from 'vee-validate';
import { snakeCase } from 'lodash';
import { LoginDto } from '@/@types/Login';
import { inject } from 'vue';
import { AuthPlugin } from '@/plugins/AuthPlugin';
import { CommunicationAnswerDto } from '@/@types/Communication';

export class ChatMessageForm extends BasicForm<CommunicationAnswerDto> {
  protected schema: Partial<Record<keyof CommunicationAnswerDto, YupSchema>> = {};
  protected form!: FormContext<CommunicationAnswerDto>
  private readonly communicationId: string | null = null;
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: "forms.communications",
      i18nKeyTransformer: snakeCase
    }, settings));
    
    this.schema = {
      message: yup.string().required().min(5).strip(),
      attachments: yup.array(),
    }
    
    this.communicationId = settings.dataToWatch ? settings.dataToWatch()._id : null;
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: CommunicationAnswerDto) {
    if (!this.communicationId) {
      return;
    }
    
    try {
      const answerResult = await this.apiCalls.api.communications.answer(this.communicationId, values);
      
      this.afterValidSubmit(answerResult as any);
    } catch (e) {
      await this.alerts.error(e);
    }
  }
  
}
