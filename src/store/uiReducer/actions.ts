import * as actions from './actionTypes';
import { FiltersObject } from '../../types';

type ActionF = <T>(payload?: T) => { type: string; payload?: T };

export const filtersChanged = (newFilters: FiltersObject) => ({
  type: actions.FILTERS_CHANGED,
  payload: {
    filters: newFilters,
  },
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

export const setLoading = (loadingStatus: boolean) => ({
  type: actions.SET_LOADING,
  payload: loadingStatus,
});
