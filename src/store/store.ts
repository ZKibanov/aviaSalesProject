import { devToolsEnhancer } from 'redux-devtools-extension';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer, devToolsEnhancer({ trace: true }));
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
