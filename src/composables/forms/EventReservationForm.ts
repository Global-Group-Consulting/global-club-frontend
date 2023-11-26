import * as yup from 'yup'
import { FormContext } from 'vee-validate'
import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm'
import { UpsertEventReservationDto } from '@/@types/GlobalEvent'

export class EventReservationForm extends BasicForm<UpsertEventReservationDto> {
  protected schema: Partial<Record<keyof UpsertEventReservationDto, YupSchema>> = {}
  protected form!: FormContext<UpsertEventReservationDto>
  private readonly eventId!: string
  private readonly reservationId!: string | null
  private noClose = false
  protected wrapSchema = true
  
  constructor (settings: FormSettings, eventId: string, reservationId?: string) {
    super(Object.assign({
      i18nRoot: 'forms.products'
    }, settings))
    
    this.schema = {
      userId: yup.mixed().when('guestUser', {
        is: (value: string) => !value,
        then: yup.mixed().required()
      }).label('"Utente"'),
      userName: yup.string().when('guestUser', {
        is: (value: string) => value,
        then: yup.string().required()
      }).label('"Utente Ospite"'),
      guestUser: yup.boolean().default(false).label('"Ospite"'),
      email: yup.string().when('guestUser', {
        is: (value: string) => value,
        then: yup.string().email().required()
      }).label('"Email"'),
      referenceAgent: yup.mixed().when('guestUser', {
        is: (value: string) => value,
        then: yup.mixed().required()
      }).label('"Agente di riferimento"'),
      companions: yup.array(
        yup.object().shape({
          firstName: yup.string().required().label('"Nome"'),
          lastName: yup.string().required().label('"Cognome"'),
          email: yup.string().email().required().label('"Email"')
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
    
    this.afterValidSubmit(answerResult as any, this.noClose)
    
  }
  
  async saveWithoutClose () {
    this.noClose = true
    
    await this.onSubmit()
    
    this.noClose = false
    
    if (this.formErrors.length) {
      return false
    }
    
    return true
  }
}
