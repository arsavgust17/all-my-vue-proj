import {VueConstructor} from "vue/types/vue";

interface IService {
  services: [string],
  guid: {
    data: [string]
  },
  price: number
}

declare module 'vue/types/vue' {
  interface VueConstructor {
    $store: {
      getters: {
        $serivce: IService
      }
    }
  }

  interface Store {
    commit(type: 'setServiceGuid', payload: [string]): void;
    commit(type: 'setServicePrice', payload: number): void;
    commit(type: 'setServiceList', payload: [string]): void;
  }
}
