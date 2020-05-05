import { action, observable } from "mobx"

export class AppState {
    @observable baseURL = '1111';
    @observable user = {};
    @observable history = {};
    @observable connection = {};

    @action
    changeURL(url) {
      this.baseURL = url
    }
}

let store = null

export const initStore = () => {
   store = new AppState()
}

export const getStore = () => {
   return store
}