import * as actions from './actionTypes';

const initialState = {
  isLoading: false,
  filters: {
    Все: true,
    'Без пересадок': true,
    '1 пересадка': true,
    '2 пересадки': true,
    '3 пересадки': true,
  },
  sorting: { filterName: 'Самый быстрый' },
  renderedTickets: 10,
};

export default function uiReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FILTERS_CHANGED:
      return {
        ...state,
        filters: action.payload.filters,
      };
    case actions.SET_SORTING:
      return {
        ...state,
        sorting: action.payload,
      };

    case actions.GET_MORE_TICKETS:
      return {
        ...state,
        renderedTickets: state.renderedTickets + 10,
      };
    case actions.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    default:
      return state;
  }
}
