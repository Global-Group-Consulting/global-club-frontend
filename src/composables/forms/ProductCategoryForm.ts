import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm'
import { Product, ProductCreateDto } from '@/@types/Product'
import { FormContext } from 'vee-validate'
import * as yup from 'yup'
import { computed, ComputedRef } from 'vue'
import { ProductCategory } from '@/@types/ProductCategory'
import { CreateProductCategoryDto } from '@/views/admin/productCategories/dto/create.product.category.dto'
import { UpdateProductCategoryDto } from '@/views/admin/productCategories/dto/update.product.category.dto'

export class ProductCategoryForm extends BasicForm<ProductCategory> {
  protected schema: Partial<Record<keyof CreateProductCategoryDto, YupSchema>> = {}
  protected form!: FormContext<CreateProductCategoryDto>
  private readonly categoryId!: ComputedRef<string | null>
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: 'forms.productCategories'
    }, settings))
    
    this.schema = {
      title: yup.string().required(),
      description: yup.string().required(),
      parent: yup.string(),
      thumbnail: yup.mixed().when('thumbnail', (thumbnail, schema) => {
        return !this.form.meta.value.initialValues?.thumbnail ? schema.required() : schema
      })
    }
    
    this.categoryId = computed(() => settings.dataToWatch ? settings.dataToWatch()?._id : null)
    this.createFormFields(settings.dataToWatch)
  }
  
  async handleSubmitValid (values: any) {
    let result: ProductCategory | undefined
    
    if (this.categoryId.value) {
      result = await this.apiCalls.api.productCategories.update(values, this.categoryId.value)
    } else {
      result = await this.apiCalls.api.productCategories.create(values)
    }
    
    if (result) {
      this.dispatch('submitCompleted', result)
    }
  }
}
