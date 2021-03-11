import GetRemoteUrl from './api/GetRemoteUrl';
import * as actions from './store/actionTypes';
import { Ticket } from './components/types';
import manageTicketsToStore from './store/mangeTicketsToStore';
import store from './store/store';

const tickets: Ticket[] = [];

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
      if (data && (data as Data).stop === true) {
        setLoadingStatus(false);
        tickets.push(...(data as Data).tickets);
        manageTicketsToStore(tickets);
      } else if (data && (data as Data).stop === false) {
        tickets.push(...(data as Data).tickets);
        manageTicketsToStore(tickets);
        getTickets();
      } else {
        getTickets();
      }
    };
    getTickets();
  }
};

export default initData;
