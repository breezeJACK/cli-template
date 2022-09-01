import { defineStore } from 'pinia';

export interface AppState {
  currentPath: string;
  entryPage: string;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    currentPath: '',
    entryPage: ''
  }),
  actions: {
    setEntryPage(url: string) {
      this.entryPage = url;
    },
    setCurrentPath(url: string) {
      this.currentPath = url;
    }
  }
});
