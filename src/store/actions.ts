import * as actions from './actionTypes';
import { FiltersObject } from '../components/types';

type ActionF = <T>(payload?: T) => { type: string; payload?: T };

export const filtersChanged = (newFilters: FiltersObject) => ({
  type: actions.FILTERS_CHANGED,
  payload: {
    filters: newFilters,
  },
});

export const ticketsAdded: ActionF = (tickets) => ({
  type: actions.TICKETS_ADDED,
  payload: tickets,
});

export const sortedByPriceAdded: ActionF = (ticketsOrder) => ({
  type: actions.SORTED_BYPRICE_ADDED,
  payload: ticketsOrder,
});

export const sortedByTimeAdded: ActionF = (ticketsOrder) => ({
  type: actions.SORTED_BYTIME_ADDED,
  payload: ticketsOrder,
});

export const sortedOptimalAdded: ActionF = (ticketsOrder) => ({
  type: actions.SORTED_OPTIMAL_ADDED,
  payload: ticketsOrder,
});

export const setSorting = (sortName: string) => ({
  type: actions.SET_SORTING,
  payload: {
    filterName: sortName,
  },
});

export const getMoreTickets: ActionF = () => ({
  type: actions.GET_MORE_TICKETS,
});

export const setLoading = (isLoading: boolean) => ({
  type: actions.SET_LOADING,
  payload: {
    isLoading,
  },
});
