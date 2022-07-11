import { installPlugin, PluginTemplate } from '@/plugins/PluginTemplate';
import { alertController, AlertInput, toastController } from '@ionic/vue'

interface AlertAskOptions {
  header: string;
  subHeader?: string;
  message: string;
  buttonOkText?: string;
  buttonCancelText?: string;
  backdropDismiss?: boolean;
  inputs?: AlertInput[];
}

export class AlertAskResponse<T = any> {
  resp!: boolean;
  values!: T | null;
}

interface AlertErrorOptions {
  title?: string;
}

export class AlertsPlugin extends PluginTemplate<void> {
  private defaultOptions: Partial<AlertAskOptions> = {
    backdropDismiss: false
  };
  
  private defaultOkButton = {
    text: 'Ok',
    role: 'ok',
  };
  
  private defaultCancelButton = {
    text: 'Annulla',
    role: 'cancel',
  };
  
  protected onInit (): void {
    console.log('alerts init');
  }
  
  async ask<T = any>(options: AlertAskOptions): Promise<AlertAskResponse<T>> {
    const buttons = [
      Object.assign({}, this.defaultCancelButton, {
        text: options.buttonCancelText ?? "Annulla"
      }),
      Object.assign({}, this.defaultOkButton, {
        text: options.buttonOkText ?? "Ok"
      })
    ];
    
    const alert = await alertController.create(
      Object.assign({}, this.defaultOptions, {
        header: options.header,
        message: options.message,
        inputs: options.inputs,
        buttons
      })
    );
    
    await alert.present();
    const answer = await alert.onDidDismiss();
    const toReturn: AlertAskResponse = {
      resp: answer.role === 'ok',
      values: null
    };
    
    if (answer.data.values) {
      toReturn.values = answer.data.values
    }
    
    return toReturn
  }
  
  async error (error?: any) {
    const buttons = [
      this.defaultOkButton
    ];
  
    const errorMessage = error.response?.data?.message || error.response?.data?.error?.message || error.message
  
    // @ts-ignore
    const t = this.plugins.$t;
  
    const alert = await alertController.create(
      Object.assign({}, this.defaultOptions, {
        header: t('alerts.generic.error.title'),
        message: t('alerts.generic.error.message', { errorMessage }),
        buttons
      })
    );
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
  
    return role === 'ok';
  }
  
  async info (message: string, title?: string) {
    const buttons = [
      this.defaultOkButton
    ];
    
    const alert = await alertController.create(
      Object.assign({}, this.defaultOptions, {
        header: title,
        message,
        buttons
      })
    );
  
    await alert.present();
  
    const { role } = await alert.onDidDismiss();
  
    return role === 'ok';
  }
  
  async toast (message: string, color?: string) {
    const toast = await toastController
      .create({
        message,
        animated: true,
        duration: 3000,
        color,
        buttons: [
          {
            icon: "close",
            role: 'cancel',
          }
        ]
      })
    
    await toast.present();
  }
  
  async toastSuccess (message: string) {
    return this.toast(message, "success")
  }
  
  async toastError (message: string) {
    return this.toast(message, "danger")
  }
}

export const alertsPlugin = installPlugin<void>('alerts', AlertsPlugin);
