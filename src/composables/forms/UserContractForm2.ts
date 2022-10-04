import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm'
import { UpdateUserContractDto, User } from '@/@types/User'
import * as yup from 'yup'
import { PackEnum } from '@/@enums/pack.enum'
import { FormContext } from 'vee-validate'
import { snakeCase } from 'lodash'
import { computed } from 'vue'

export class UserContractForm2 extends BasicForm<UpdateUserContractDto> {
  protected schema: Partial<Record<keyof User & Pick<UpdateUserContractDto, 'clubPackStartAt' | 'clubPackEndAt'>, YupSchema>> = {}
  protected form!: FormContext<UpdateUserContractDto>
  private readonly userId: string | null = null
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: 'forms.userContract',
      i18nKeyTransformer: snakeCase
    }, settings))
    
    this.schema = computed(() => {
      const clubPackEndAt = yup.date()
      
      if (this.formData.clubPackStartAt) {
        clubPackEndAt.min(this.formData.clubPackStartAt.modelValue)
      }
      
      return {
        clubCardNumber: yup.string().min(5),
        clubPack: yup.string().required().oneOf(Object.values(PackEnum)),
        clubPackStartAt: yup.date().nullable().min(new Date('2020-01-01')),
        clubPackEndAt
      }
    })
    
    // TODO:: validate end date is after start date
    
    this.userId = settings.dataToWatch ? settings.dataToWatch()._id : null
    this.createFormFields(settings.dataToWatch)
  }
  
  async handleSubmitValid (values: UpdateUserContractDto) {
    const result = await this.apiCalls.api.users.update<UpdateUserContractDto & { clubPackHistory: any[] }>(values, this.userId)
    
    if (result) {
      result.clubPackStartAt = result.clubPackHistory[0].startsAt?.split('T')[0]
      result.clubPackEndAt = result.clubPackHistory[0].endsAt?.split('T')[0]
      
      this.afterValidSubmit(result)
    }
  }
  
}
