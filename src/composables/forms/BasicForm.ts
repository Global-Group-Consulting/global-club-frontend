import { configure, FormContext, InvalidSubmissionContext, useField, useForm } from 'vee-validate'
import { computed, ComputedRef, inject, reactive, ref, Ref, UnwrapRef, watch } from 'vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { AlertsPlugin } from '@/plugins/Alerts'
import { Composer, useI18n } from 'vue-i18n'
import { UpdateUserContractDto } from '@/@types/User'
import { MixedSchema } from 'yup/lib/mixed'
import { ArraySchema, BooleanSchema, DateSchema, NumberSchema, ObjectSchema, setLocale } from 'yup'
import StringSchema from 'yup/lib/string'
import { get } from 'lodash'
import * as yup from 'yup'
// @ts-ignore
import { it } from 'yup-locales'

export type FormFields<T = any> = Record<keyof T, FormField>;

export type YupSchema = MixedSchema
  | BooleanSchema
  | StringSchema
  | NumberSchema
  | DateSchema
  | ObjectSchema<any>
  | ArraySchema<any>
  | null

export interface FormField {
  modelValue: Ref;
  initialValue: Ref;
  errorMessage: Ref<string | undefined>;
  
  resetField ();
}

export interface FormSettings<T = any> {
  dataToWatch?: () => T;
  emit?: any;
  i18nRoot?: string;
  i18nKeyTransformer?: (key: string) => string;
}

type BasicFormEventType = 'submitCompleted';

export declare interface BasicForm<T> {
  addEventListener (type: 'submitCompleted', callback: ((evt: BasicFormEvent<T>) => void) | null, options?: AddEventListenerOptions | boolean): void;
}

class BasicFormEvent<T> extends CustomEvent<T> {
  constructor (type: BasicFormEventType, eventInitDict?: (CustomEventInit<T> | undefined)) {
    super(type, eventInitDict)
  }
}

export abstract class BasicForm<T> extends EventTarget {
  protected abstract schema: Record<string, any> | ComputedRef<Record<string, any>>
  private formFields: FormFields = {}
  private initialData: Ref<Record<string, any> | null> = ref({})
  protected form !: FormContext<any>
  protected apiCalls!: HttpPlugin
  protected alerts!: AlertsPlugin
  protected i18n!: Composer
  protected cbOnSubmitSuccess: null | ((data: T | undefined) => void) = null
  protected wrapSchema = false
  public onSubmit: any = null
  public onEditClick = (newVal: any) => {
    this.isEditing.value = (newVal && typeof newVal === 'boolean') ? newVal : !this.isEditing.value
    
    if (!this.isEditing.value) {
      this.resetForm()
    }
  }
  private isEditing = ref(false)
  
  protected constructor (private settings: FormSettings<T>) {
    super()
    
    // Set yup locale
    setLocale(it)
    
    if (settings.dataToWatch) {
      // when data changes, update initial data.
      watch(settings.dataToWatch,
        (value: T) => this.updateInitialFormData(value),
        { deep: true }
      )
    }
    
    this.apiCalls = inject('http') as HttpPlugin
    this.alerts = inject('alerts') as AlertsPlugin
    this.i18n = useI18n()
  }
  
  public getSchema (onlyValue = true) {
    if (this.schema.constructor.name === "ComputedRefImpl" && onlyValue) {
      return this.schema["value"]
    }
    
    return this.schema
  }
  
  public addEventListener (type, callback, options?): void {
    return super.addEventListener(type, callback, options)
  }
  
  /**
   * Method that will be invoked once the form is valid and the user has clicked
   * on the submit button.
   * This method should handle the necessary api call to the server and send
   * the form data.
   */
  abstract handleSubmitValid (values: T)
  
  public get editing () {
    return this.isEditing.value
  }
  
  public get formData (): UnwrapRef<FormFields<T>> {
    return reactive<any>(this.formFields)
  }
  
  protected get formErrors () {
    return Object.entries(this.form.errors.value).map(er => {
      const key: string = er[0]
      const msg: string | undefined = er[1]
      const toReturn: string[] = []
      
      if (this.settings.i18nRoot) {
        const keyText = this.settings.i18nKeyTransformer ? this.settings.i18nKeyTransformer(key) : key
        
        toReturn.push(this.i18n.t(this.settings.i18nRoot + '.' + keyText))
      }
      
      (msg && toReturn.push(msg))
      
      return toReturn.join(': ')
    })
  }
  
  protected createFormFields (initialData?: () => T) {
    // First set the initial data
    this.updateInitialFormData(initialData ? initialData() : {})
    
    // Creates the VeeValidate form by setting the validation schema and
    // initialValues
    this.form = useForm({
      // @ts-ignore
      validationSchema: yup.object().shape(this.schema),
      initialValues: this.initialData,
    })
    
    // Define the onSubmit method
    // that will be used to bind on the form submit event
    this.onSubmit = this.form.handleSubmit<Promise<T>>((values) => this.handleSubmitValid(values),
      (invalidSubmissionContext: InvalidSubmissionContext) => this.onHandleSubmitInvalid(invalidSubmissionContext))
    
    const keys = Object.keys(this.getSchema()).reduce((acc, curr) => {
      const newKey: string = curr
      
      if (this.getSchema()[curr] instanceof ObjectSchema) {
        Object.keys(this.getSchema()[curr].fields).forEach(subKey => {
          acc.push(newKey + '.' + subKey)
        })
      } else {
        acc.push(newKey)
      }
      
      return acc
    }, [] as string[])
    
    this.formFields = keys.reduce<FormFields>((acc, key) => {
      const validation = get(this.getSchema(), key)
      
      const { value, errorMessage, resetField } = useField<any>(key, validation, {})
      
      if (this.initialData.value?.hasOwnProperty(key)) {
        value.value = this.initialData.value[key]
      }
      
      acc[key] = {
        modelValue: value,
        errorMessage,
        resetField,
        initialValue: computed(() => this.initialData.value?.hasOwnProperty(key) ? this.initialData.value[key] : null)
      }
      
      return acc
    }, {})
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onHandleSubmitInvalid (invalidSubmissionContext: InvalidSubmissionContext) {
    return this.alerts.toastError(this.formErrors.join('<br>'))
  }
  
  protected afterValidSubmit (result?: T) {
    const initialData = this.settings.dataToWatch ? (this.settings.dataToWatch() ?? {}) : {}
    const dataToEmit = Object.assign({}, initialData, result || {})
    
    // merges new data with initial data. This because new data does not contain
    // all the user data, but only the necessary data.
    this.updateInitialFormData<UpdateUserContractDto>(result || {})
    
    if (this.settings.emit) {
      this.settings.emit('update:modelValue', dataToEmit)
    }
    
    this.dispatch('submitCompleted', result)
    
    if (this.cbOnSubmitSuccess) {
      this.cbOnSubmitSuccess(result)
    }
    
    this.onEditClick(false)
  }
  
  protected dispatch (event: BasicFormEventType, data: any) {
    super.dispatchEvent(new BasicFormEvent(event, { detail: data }))
  }
  
  public async onSubmitCompleted (cb: (data: T | undefined) => void) {
    this.cbOnSubmitSuccess = cb
  }
  
  public updateInitialFormData<T> (data?: Partial<Record<keyof T, any>>) {
    if (!this.getSchema() || !data) {
      return
    }
    
    Object.keys(this.getSchema()).forEach(key => {
      if (!this.initialData.value) {
        this.initialData.value = {}
      }
      
      this.initialData.value[key] = data[key]
    })
    
    if (this.form) {
      this.form.resetForm()
    }
  }
  
  public resetForm () {
    this.form.resetForm()
  }
}

