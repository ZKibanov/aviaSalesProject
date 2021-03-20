import { combineReducers } from '@reduxjs/toolkit';

import uiReducer from './uiReducer';
import dataReducer from './dataReducer';

const reducer = combineReducers({
  ui: uiReducer,
  info: dataReducer,
});

export default reducer;
