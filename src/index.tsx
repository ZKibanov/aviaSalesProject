import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import store from './store/store';
import GetRemoteUrl from './api/GetRemoteUrl';
import getSortedIndexArray from './components/App/getSortedIndexArray';
import * as actions from './store/actionTypes';
import { Ticket, SortResult } from './components/types';

const tickets: Ticket[] = [];
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

const setLoadingStatus = (loadingStatus: boolean) => {
  store.dispatch({
    type: actions.SET_LOADING,
    payload: loadingStatus,
  });
};

interface SearchId {
  searchId: string;
}

interface Data {
  tickets: Ticket[];
  stop: boolean;
}

const initData = async () => {
  setLoadingStatus(true);
  const searchId = await GetRemoteUrl.getResource(
    'https://front-test.beta.aviasales.ru/search'
  );

  if (searchId === null) {
    initData();
  } else {
    const getTickets = async () => {
      const data = await GetRemoteUrl.getResource(
        `https://front-test.beta.aviasales.ru/tickets?searchId=${
          (searchId as SearchId).searchId
        }`
      );
      if (data !== null && (data as Data).stop === true) {
        tickets.push(...(data as Data).tickets);
        addTicketsToStore(sortTickets(tickets));
        setLoadingStatus(false);
        const sortedByTime: SortResult[] = getSortedIndexArray(tickets, 'time');
        addSortedByTimeToStore(sortedByTime);
        const sortedByPrice: SortResult[] = getSortedIndexArray(
          tickets,
          'price'
        );
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

        return;
      }

      if (data && (data as Data).tickets) {
        tickets.push(...(data as Data).tickets);
        getTickets();
      } else {
        getTickets();
      }
    };
    getTickets();
  }
};

initData();
const update = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
};
update();
store.subscribe(update);
