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
  tickets: [],
  timeSorted: [],
  priceSorted: [],
  optimalSorted: [],
  sorting: { filterName: 'Самый быстрый' },
  renderedTickets: 10,
};

export default function reducer(state = initialState, action) {
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
