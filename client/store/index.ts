import { decorate, observable, computed } from "mobx"

export class AppState {
    @observable baseURL = '';
    @observable user = {};
    @observable history = {};
    @observable connection = {};
}

let store = null

export const initStore = () => {
   store = new AppState()
}

export const getStore = () => {
   return store
}