import { installPlugin, PluginTemplate } from '@/plugins/PluginTemplate';
import { alertController } from '@ionic/vue';

interface AlertAskOptions {
  header: string;
  subHeader?: string;
  message: string;
  buttonOkText?: string;
  buttonCancelText?: string;
  backdropDismiss?: boolean;
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
  
  async ask (options: AlertAskOptions): Promise<boolean> {
    const buttons = [
      Object.assign({}, this.defaultCancelButton, {
        text: options.buttonCancelText
      }),
      Object.assign({}, this.defaultOkButton, {
        text: options.buttonOkText
      })
    ];
    
    const alert = await alertController.create(
      Object.assign({}, this.defaultOptions, {
        header: options.header,
        message: options.message,
        buttons
      })
    );
    
    await alert.present();
    
    const { role } = await alert.onDidDismiss();
    
    return role === 'ok';
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
}

export const alertsPlugin = installPlugin<void>('alerts', AlertsPlugin);
