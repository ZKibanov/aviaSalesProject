import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import store from './store/store';
import GetRemoteUrl from './api/GetRemoteUrl';
import getSortedIndexArray from './components/App/getSortedIndexArray';
import * as actions from './store/actionTypes';
import { Ticket,sortResult } from './components/App/types';

const tickets: Ticket[] = [];
const sortTickets = (ticketsArray: Ticket[]) => Object.assign({}, ticketsArray);
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

const initData = async () => {
  const searchId = await GetRemoteUrl.getResource(
    'https://front-test.beta.aviasales.ru/search'
  );
  const getTickets = async () => {
    const data = await GetRemoteUrl.getResource(
      `https://front-test.beta.aviasales.ru/tickets?searchId=${searchId.searchId}`
    );
    if (data && data.stop === true) {
      tickets.push(...data.tickets);
      addTicketsToStore(sortTickets(tickets));
      const sortedByTime: sortResult[] = getSortedIndexArray(tickets, [
        'segments',
        '0',
        'duration',
      ]);
      addSortedByTimeToStore(sortedByTime);
      const sortedByPrice: sortResult[] = getSortedIndexArray(tickets, ['price']);
      addSortedByPriceToStore(sortedByPrice);

      const sortByIndex = function (a:sortResult, b:sortResult) {
        if (a.index > b.index) {
          return 1;
        }
        if (a.index < b.index) {
          return -1;
        }
        return 0;
      }

      const sortedOptimal: sortResult[] = (sortedByPrice.map((el,position)=>{
        return {
          index:el.index,
          stops:el.stops,
          value:position,
        }
      })).sort(sortByIndex)

      const sortedTimeForOptimal = sortedByTime.map(((el,position)=>{
        return {
          index:el.index,
          stops:el.stops,
          value:position,
        }
      })).sort(sortByIndex);

      for (let i = 0;i < tickets.length;i+=1){
        sortedOptimal[i].value += sortedTimeForOptimal[i].value
      }

      addSortedOptimalToStore(sortedOptimal.sort((a,b)=>{
        if (a.value > b.value) {
          return 1;
        }
        if (a.value < b.value) {
          return -1;
        }
        return 0;
      }));

    return;
    }

    if (data && data.tickets) {
      tickets.push(...data.tickets);
      getTickets();
    } else {
      getTickets();
    }
  };
  getTickets();
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
