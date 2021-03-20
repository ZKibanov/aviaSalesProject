import getSortedIndexArray, { sortNumbers } from './getSortedIndexArray';
import * as actions from './actions';
import { Ticket, SortResult } from '../components/types';
import store from './store';

const sortTickets = (ticketsArray: Ticket[]) => ({ ...ticketsArray });

const manageTicketsToStore = (tickets: Ticket[]): void => {
  const sortedByTime: SortResult[] = getSortedIndexArray(tickets, 'time');
  const sortedByPrice: SortResult[] = getSortedIndexArray(tickets, 'price');

  store.dispatch(actions.ticketsAdded(sortTickets(tickets)));
  store.dispatch(actions.sortedByTimeAdded(sortedByTime));
  store.dispatch(actions.sortedByPriceAdded(sortedByPrice));

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
  store.dispatch(actions.sortedOptimalAdded(sortedOptimal.sort(sortNumbers)));
};

export default manageTicketsToStore;
