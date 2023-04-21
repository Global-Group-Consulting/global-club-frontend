import * as yup from 'yup'
import { FormContext } from 'vee-validate'
import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm'
import { UpsertEventReservationDto } from '@/@types/GlobalEvent'

export class EventReservationForm extends BasicForm<UpsertEventReservationDto> {
  protected schema: Partial<Record<keyof UpsertEventReservationDto, YupSchema>> = {}
  protected form!: FormContext<UpsertEventReservationDto>
  private readonly eventId!: string
  private readonly reservationId!: string | null
  
  constructor (settings: FormSettings, eventId: string, reservationId?: string) {
    super(Object.assign({
      i18nRoot: 'forms.products'
    }, settings))
    
    this.schema = {
      userId: yup.mixed().required().label('"Utente"'),
      companions: yup.array(
        yup.object().shape({
          firstName: yup.string().required().label('"Nome"'),
          lastName: yup.string().required().label('"Cognome"')
        })
      ).nullable()
    }
    
    this.eventId = eventId
    this.reservationId = reservationId || null
    this.createFormFields(settings.dataToWatch)
  }
  
  protected get formErrors () {
    return Object.entries(this.form.errors.value).map(er => {
      const key: string = er[0]
      let msg: string | undefined = er[1]
      const toReturn: string[] = []
      
      if (key.startsWith('companions')) {
        const index = key.split(/\[(.*?)\]/)[1]
        
        msg = `Accompagnatore #${+index + 1}: ` + msg
      }
      
      if (msg) {
        toReturn.push(msg)
      }
      
      return toReturn.join(': ')
    })
  }
  
  async handleSubmitValid (values: UpsertEventReservationDto) {
    if (!this.eventId) {
      return
    }
    
    if (this.reservationId) {
      values['reservationId'] = this.reservationId
    }
    
    const answerResult = await this.apiCalls.api.events.reservations.upsert(this.eventId, values)
    
    this.afterValidSubmit(answerResult as any)
    
  }
  
}
