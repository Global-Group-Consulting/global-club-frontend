import {ComponentCustomProperties} from "@vue/runtime-core";
import {App, Plugin} from "vue";
import {Store} from "vuex";
import {State} from "@/store";

export abstract class PluginTemplate<Options> {
  protected plugins: ComponentCustomProperties
  protected options: Options | undefined
  
  constructor(plugins: ComponentCustomProperties, options?: Options) {
    this.plugins = plugins
    this.options = options;
    
    this.onInit(options)
  }
  
  protected abstract onInit(options?: Options): void
  
  protected get store(): Store<State> {
    return this.plugins.$store
  }
}

export function installPlugin<Options>(pluginName: string, classToInit: any, options?: Options): Plugin {
  return {
    install(app: App) {
      app.config.globalProperties[`$${pluginName}`] = new classToInit(app.config.globalProperties, options)
      app.provide(pluginName, app.config.globalProperties[`$${pluginName}`])
    }
  }
}
