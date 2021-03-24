import * as actions from './actionTypes';

const initialState = {
  tickets: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TICKETS_ADDED:
      return {
        ...state,
        tickets: action.payload,
      };

    default:
      return state;
  }
}
