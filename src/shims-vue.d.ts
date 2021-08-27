import {ComponentCustomProperties} from 'vue'
import {Store} from 'vuex'

declare module '*.vue' {
  import {defineComponent} from 'vue'
  const component: ReturnType<typeof defineComponent>
  
  export default component
}

declare module '@vue/runtime-core' {
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
