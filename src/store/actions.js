import * as actions from "./actionTypes";

export function filtersChanged(filterName, filterState) {
  return {
    type: actions.FILTERS_CHANGED,
    payload: {
      filterName,
      filterState,
    },
  };
}
export function ticketsAdded( tickets) {
  return {
    type: actions.TICKETS_ADDED,
    payload: {
      tickets
    },
  };
}

export function sortedByPriceAdded( ticketsOrder) {
  return {
    type: actions.SORTED_BYPRICE_ADDED,
    payload: {
      ticketsOrder
    },
  }
}

export function sortedByTimeAdded( ticketsOrder) {
  return {
    type: actions.SORTED_BYTIME_ADDED,
    payload: {
      ticketsOrder
    },
  }
}

export function sortedOptimalAdded( ticketsOrder) {
  return {
    type: actions.SORTED_OPTIMAL_ADDED,
    payload: {
      ticketsOrder
    },
  }
}

export function setSorting(sortName){
  return {
    type:actions.SET_SORTING,
    payload:{
      sortName
    }
  }
}


export const getMoreTickets = () => ({
  type: actions.GET_MORE_TICKETS,
});


