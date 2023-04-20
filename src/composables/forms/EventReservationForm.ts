import * as yup from 'yup'
import { FormContext } from 'vee-validate'
import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm'
import { UpsertEventReservationDto } from '@/@types/GlobalEvent'

export class EventReservationForm extends BasicForm<UpsertEventReservationDto> {
  protected schema: Partial<Record<keyof UpsertEventReservationDto, YupSchema>> = {}
  protected form!: FormContext<UpsertEventReservationDto>
  private readonly productId: string | null = null
  private readonly eventId!: string
  
  constructor (settings: FormSettings, eventId: string) {
    super(Object.assign({
      i18nRoot: 'forms.products'
    }, settings))
    
    this.schema = {
      userId: yup.mixed().required(),
      companions: yup.array(
        /* yup.object().shape({
           firstName: yup.string().required(),
           lastName: yup.string().required()
         })*/
      ).nullable()
    }
    
    this.eventId = eventId
    this.createFormFields(settings.dataToWatch)
  }
  
  async handleSubmitValid (values: UpsertEventReservationDto) {
    if (!this.eventId) {
      return
    }
    
    try {
      const answerResult = await this.apiCalls.api.events.reservations.add(this.eventId, values)
      
      this.afterValidSubmit(answerResult as any)
    } catch (e) {
      await this.alerts.error(e)
    }
  }
  
}
