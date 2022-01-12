import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import { CreateManualMovementDto } from '@/@types/Movement';
import { FormContext } from 'vee-validate';
import { snakeCase } from 'lodash';
import * as yup from 'yup';
import { formatBrites } from '@/@utilities/currency';

export class ManualMovementForm extends BasicForm<CreateManualMovementDto> {
  protected schema: Partial<Record<keyof CreateManualMovementDto, YupSchema>> = {};
  protected form!: FormContext<CreateManualMovementDto>;
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nKeyTransformer: snakeCase
    }, settings));
    
    this.schema = {
      notes: yup.string().required(),
      amountChange: yup.number().min(1).required(),
      semesterId: yup.string().required(),
      type: yup.string(),
      userId: yup.string(),
      clubPack: yup.string().required()
    };
    
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: CreateManualMovementDto) {
    try {
      
      const response = await this.alerts.ask({
        header: (values.type === 'add' ? 'Aggiungi' : 'Rimuovi') + ' brite?',
        message: `State per ${values.type === 'add' ? 'aggiungere' : 'rimuovere'} ${formatBrites(values.amountChange)}. Siete sicuri di voler continuare?`,
        buttonOkText: 'Si, ' + (values.type === 'add' ? 'Aggiungi' : 'Rimuovi'),
        buttonCancelText: 'Annulla'
      });
      
      if (!response) {
        return;
      }
      
      if (values.type === 'add') {
        await this.apiCalls.api.movements.manualAdd(values.userId, values);
      } else {
        await this.apiCalls.api.movements.manualRemove(values.userId, values);
      }
      
      this.afterValidSubmit();
    } catch (e) {
      await this.alerts.error(e);
    }
  }
}
