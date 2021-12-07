import { FormContext, InvalidSubmissionContext, useField, useForm } from 'vee-validate';
import { inject, reactive, ref, Ref, UnwrapRef, watch } from 'vue';
import { HttpPlugin } from '@/plugins/HttpPlugin';
import { AlertsPlugin } from '@/plugins/Alerts';
import { Composer, useI18n } from 'vue-i18n';
import { UpdateUserContractDto } from '@/@types/User';
import { MixedSchema } from 'yup/lib/mixed';
import { ArraySchema, BooleanSchema, DateSchema, NumberSchema, ObjectSchema } from 'yup';
import StringSchema from 'yup/lib/string';

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
  errorMessage: Ref<string | undefined>;
}

export interface FormSettings<T = any> {
  dataToWatch: () => T;
  emit?: any;
  i18nRoot?: string;
  i18nKeyTransformer?: (key: string) => string;
}

export abstract class BasicForm<T> {
  protected abstract schema: Record<string, any>
  private formFields: FormFields = {};
  private initialData: Ref<Record<string, any> | null> = ref({})
  protected form !: FormContext<any>
  protected apiCalls!: HttpPlugin;
  protected alerts!: AlertsPlugin;
  protected i18n!: Composer;
  protected cbOnSubmitSuccess: null | ((data: T) => void) = null
  public onSubmit: any = null;
  public onEditClick = (newVal: any) => {
    this.isEditing.value = (newVal && typeof newVal === 'boolean') ? newVal : !this.isEditing.value;
    
    if (!this.isEditing.value) {
      this.resetForm()
    }
  }
  private isEditing = ref(false);
  
  protected constructor (private settings: FormSettings<T>) {
    // when data changes, update initial data.
    watch(settings.dataToWatch,
      (value: T) => this.updateInitialFormData(value),
      { deep: true }
    )
    
    this.apiCalls = inject("http") as HttpPlugin;
    this.alerts = inject("alerts") as AlertsPlugin;
    this.i18n = useI18n();
  }
  
  abstract handleSubmitValid (values: T)
  
  public get editing () {
    return this.isEditing.value
  }
  
  protected get formData (): UnwrapRef<FormFields<T>> {
    return reactive<any>(this.formFields);
  }
  
  protected get formErrors () {
    return Object.entries(this.form.errors.value).map(er => {
      const key: string = er[0];
      const msg: string | undefined = er[1];
      const toReturn: string[] = []
      
      if (this.settings.i18nRoot) {
        const keyText = this.settings.i18nKeyTransformer ? this.settings.i18nKeyTransformer(key) : key;
        
        toReturn.push(this.i18n.t(this.settings.i18nRoot + "." + keyText));
      }
      
      (msg && toReturn.push(msg));
      
      return toReturn.join(": ");
    })
  }
  
  protected createFormFields (initialData: T) {
    // First set the initial data
    this.updateInitialFormData(initialData);
    
    // Creates the VeeValidate form by setting the validation schema and
    // initialValues
    this.form = useForm({
      validationSchema: this.schema,
      initialValues: this.initialData
    });
    
    // Define the onSubmit method
    // that will be used to bind on the form submit event
    this.onSubmit = this.form.handleSubmit<Promise<T>>((values) => this.handleSubmitValid(values),
      (invalidSubmissionContext: InvalidSubmissionContext) => this.onHandleSubmitInvalid(invalidSubmissionContext))
    
    this.formFields = Object.keys(this.schema).reduce<FormFields>((acc, key) => {
      const validation = this.schema[key];
      const { value, errorMessage } = useField<any>(key, validation, {})
      
      if (this.initialData.value?.hasOwnProperty(key)) {
        value.value = this.initialData.value[key]
      }
      
      acc[key] = {
        modelValue: value,
        errorMessage
      }
      
      return acc
    }, {})
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected onHandleSubmitInvalid (invalidSubmissionContext: InvalidSubmissionContext) {
    return this.alerts.toastError(this.formErrors.join("<br>"));
  }
  
  protected afterValidSubmit (result: T) {
    const dataToEmit = Object.assign({}, this.settings.dataToWatch(), result);
    
    // merges new data with initial data. This because new data does not contain
    // all the user data, but only the necessary data.
    this.updateInitialFormData<UpdateUserContractDto>(result);
    
    if (this.settings.emit) {
      this.settings.emit("update:modelValue", dataToEmit);
    }
    
    if (this.cbOnSubmitSuccess) {
      this.cbOnSubmitSuccess(result)
    }
    
    this.onEditClick(false);
  }
  
  public async onSubmitCompleted (cb: (data: T) => void) {
    this.cbOnSubmitSuccess = cb
  }
  
  public updateInitialFormData<T> (data: Partial<Record<keyof T, any>>) {
    if (!this.schema) {
      return
    }
    
    Object.keys(this.schema).forEach(key => {
      if (!this.initialData.value) {
        this.initialData.value = {}
      }
      
      this.initialData.value[key] = data[key]
    })
    
    if (this.form) {
      this.form.resetForm();
    }
  }
  
  public resetForm () {
    this.form.resetForm()
  }
}
