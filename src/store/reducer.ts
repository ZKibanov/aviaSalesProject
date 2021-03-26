import { combineReducers } from 'redux';

import uiReducer from './uiReducer/uiReducer';
import dataReducer from './dataReducer/dataReducer';

const reducer = combineReducers({
  ui: uiReducer,
  data: dataReducer,
});

export default reducer;
