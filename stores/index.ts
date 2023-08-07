import { createContext } from 'react';
import CommonStore from './CommonStore';

export function createStores() {
  return {
    commonStore: new CommonStore(),
  };
}

const stores = createStores();
export const AppContext = createContext(stores);
export default stores;
