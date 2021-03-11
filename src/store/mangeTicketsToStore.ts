import getSortedIndexArray from './getSortedIndexArray';
import * as actions from './actionTypes';
import { Ticket, SortResult } from '../components/types';
import store from './store';

const sortTickets = (ticketsArray: Ticket[]) => ({ ...ticketsArray });
const addTicketsToStore = (ticketsArray: Ticket[]) => {
  store.dispatch({
    type: actions.TICKETS_ADDED,
    payload: ticketsArray,
  });
};

const addSortedByTimeToStore = (ticketsOrder: object[]) => {
  store.dispatch({
    type: actions.SORTED_BYTIME_ADDED,
    payload: ticketsOrder,
  });
};

const addSortedByPriceToStore = (ticketsOrder: object[]) => {
  store.dispatch({
    type: actions.SORTED_BYPRICE_ADDED,
    payload: ticketsOrder,
  });
};

const addSortedOptimalToStore = (ticketsOrder: object[]) => {
  store.dispatch({
    type: actions.SORTED_OPTIMAL_ADDED,
    payload: ticketsOrder,
  });
};

const manageTicketsToStore = (tickets: Ticket[]): void => {
  addTicketsToStore(sortTickets(tickets));
  const sortedByTime: SortResult[] = getSortedIndexArray(tickets, 'time');
  addSortedByTimeToStore(sortedByTime);
  const sortedByPrice: SortResult[] = getSortedIndexArray(tickets, 'price');
  addSortedByPriceToStore(sortedByPrice);

  const sortByIndex = (a: SortResult, b: SortResult) => {
    if (a.index > b.index) {
      return 1;
    }
    if (a.index < b.index) {
      return -1;
    }
    return 0;
  };

  const sortedOptimal: SortResult[] = sortedByPrice
    .map((el, position) => ({
      index: el.index,
      stops: el.stops,
      value: position,
    }))
    .sort(sortByIndex);

  const sortedTimeForOptimal = sortedByTime
    .map((el, position) => ({
      index: el.index,
      stops: el.stops,
      value: position,
    }))
    .sort(sortByIndex);

  for (let i = 0; i < tickets.length; i += 1) {
    sortedOptimal[i].value += sortedTimeForOptimal[i].value;
  }

  addSortedOptimalToStore(
    sortedOptimal.sort((a, b) => {
      if (a.value > b.value) {
        return 1;
      }
      if (a.value < b.value) {
        return -1;
      }
      return 0;
    })
  );
};

export default manageTicketsToStore;
