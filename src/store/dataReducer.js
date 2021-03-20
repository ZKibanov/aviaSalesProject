import * as actions from './actionTypes';

const initialState = {
  tickets: [],
  timeSorted: [],
  priceSorted: [],
  optimalSorted: [],
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case actions.TICKETS_ADDED:
      return {
        ...state,
        tickets: action.payload,
      };
    case actions.SORTED_BYPRICE_ADDED:
      return {
        ...state,
        priceSorted: action.payload,
      };

    case actions.SORTED_BYTIME_ADDED:
      return {
        ...state,
        timeSorted: action.payload,
      };

    case actions.SORTED_OPTIMAL_ADDED:
      return {
        ...state,
        optimalSorted: action.payload,
      };

    default:
      return state;
  }
}
