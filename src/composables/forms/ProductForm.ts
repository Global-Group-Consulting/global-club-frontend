import { BasicForm, FormSettings, YupSchema } from '@/composables/forms/BasicForm';
import { Product, ProductCreateDto } from '@/@types/Product';
import { FormContext } from 'vee-validate';
import * as yup from 'yup';
import { computed, ComputedRef } from 'vue';
import { ProductCategory } from '@/@types/ProductCategory';

export class ProductForm extends BasicForm<Product> {
  protected schema: Partial<Record<keyof ProductCreateDto, YupSchema>> = {};
  protected form!: FormContext<ProductCreateDto>
  private readonly productId!: ComputedRef<string | null>;
  
  constructor (settings: FormSettings) {
    super(Object.assign({
      i18nRoot: "forms.products",
    }, settings));
    
    this.schema = {
      title: yup.string().required(),
      description: yup.string().required(),
      conditions: yup.string(),
      price: yup.number(),
      categories: yup.array().required(),
      minPacks: yup.array(),
      thumbnail: yup.mixed().when('thumbnail', (thumbnail, schema) => {
        return !this.form.meta.value.initialValues?.thumbnail ? schema.required() : schema
      }),
      images: yup.array().when('images', {
        is: () => !this.form.meta.value.initialValues?.images?.length,
        then: yup.array().min(1)
      }),
      visible: yup.boolean(),
      hasQta: yup.boolean(),
      priceUndefined: yup.boolean(),
      packChange: yup.boolean(),
      packChangeTo: yup.string().when('packChange', {
        is: true,
        then: (schema) => schema.required()
      }),
      location: yup.object({
        city: yup.string(),
        province: yup.string(),
        region: yup.string()
      })
    }
  
    this.productId = computed(() => settings.dataToWatch ? settings.dataToWatch()?._id : null);
    this.createFormFields(settings.dataToWatch);
  }
  
  async handleSubmitValid (values: ProductCreateDto) {
    let result: Product | undefined;
    
    if (this.productId.value) {
      result = await this.apiCalls.api.products.update(values, this.productId.value);
    } else {
      result = await this.apiCalls.api.products.create(values);
    }
    
    if (result) {
      this.dispatch('submitCompleted', result);
    }
  }
  
  public formatCurrentProduct (product: Product): Product & { categories: string[] } {
    return {
      ...product,
      // @ts-ignore
      categories: product?.categories ? this.formatCategories(product.categories) : null,
      visible: product?.visible ?? true,
      hasQta: product?.hasQta ?? true,
      location: product?.location ?? {
        city: "",
        region: "",
        province: ""
      }
    };
  }
  
  public formatCategories (categories: ProductCategory[]): string[] {
    return categories.reduce((acc, curr) => {
      acc.push(curr._id)
      return acc
    }, [] as string[])
  }
  
}
