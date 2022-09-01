import { AppState } from './modules/app';

export interface RootState {
  modules: {
    app: AppState;
  };
}
