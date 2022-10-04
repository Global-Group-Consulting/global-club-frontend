import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import { FormContext } from 'vee-validate';
import * as yup from 'yup';
import { UpdateOrderProductDto } from '@/@types/Order';

export class OrderProductForm extends BasicForm<UpdateOrderProductDto> {
  protected schema: Partial<Record<keyof UpdateOrderProductDto, YupSchema>> = {};
  protected form!: FormContext<UpdateOrderProductDto>
  private readonly productId: string | null = null;
  private readonly orderId!: string;
  
  constructor (settings: FormSettings, orderId: string) {
    super(Object.assign({
      i18nRoot: "forms.products",
    }, settings));
    
    this.schema = {
      qta: yup.number().required().min(1),
      price: yup.number().required(),
      repayment: yup.boolean()
    }
    
    this.productId = settings.dataToWatch ? settings.dataToWatch().product._id : null;
    this.orderId = orderId
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: UpdateOrderProductDto) {
    if (!this.productId) {
      return;
    }
    
    try {
      const answerResult = await this.apiCalls.api.orders.updateProduct(this.orderId, this.productId, values);
      
      this.afterValidSubmit(answerResult as any);
    } catch (e) {
      await this.alerts.error(e);
    }
  }
  
}
