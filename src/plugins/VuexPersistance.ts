import { Storage } from '@ionic/storage';
import { cloneDeep } from 'lodash';

export default function () {
  const options = {
    modules: ["cart"],
    storageKey: "vuex"
  }
  const storage = new Storage()
  
  return async (store) => {
    await storage.create();
    
    // store initial data
    const prevState: any = options.modules.reduce((acc, key) => {
      if (store.state[key]) {
        acc[key] = cloneDeep(store.state[key])
      } else {
        acc[key] = {}
      }
      
      return acc
    }, {})
    const storageKeys = await storage.keys();
    
    if (!storageKeys.includes(options.storageKey)) {
      // create the basic key inside the storage
      await storage.set(options.storageKey, prevState)
    } else {
      // restore data
      const existingData = await storage.get(options.storageKey);
      
      // replace the current state with the stored one
      store.replaceState(Object.assign({}, store.state, existingData))
    }
    
    store.subscribe(async (mutation, state) => {
      const module = mutation.type?.toString().includes("/") ? mutation.type.split("/")[0] : null
      
      // only react to requested modules changes
      if (!module || !options.modules.includes(module)) {
        return
      }
      
      const nextState = cloneDeep(state[module])
      
      await storage.set(options.storageKey, Object.assign(prevState, {
        [module]: nextState
      }))
    })
  }
}
