import GetRemoteUrl from './api/GetRemoteUrl';
import * as actions from './store/uiReducer/actions';
import { ticketsAdded } from './store/dataReducer/dataReducer';
import { Ticket } from './components/types';
import store from './store/store';

const tickets: Ticket[] = [];

interface SearchId {
  searchId: string;
}

interface Data {
  tickets: Ticket[];
  stop: boolean;
}

const initData = async () => {
  store.dispatch(actions.setLoading(true));

  const searchId = await GetRemoteUrl.getResource(
    'https://front-test.beta.aviasales.ru/search'
  );

  const initialData = await GetRemoteUrl.getResource(
    `https://front-test.beta.aviasales.ru/tickets?searchId=${
      (searchId as SearchId).searchId
    }`
  );

  if (initialData && (initialData as Data).stop === false) {
    tickets.push(...(initialData as Data).tickets);
    store.dispatch(ticketsAdded(tickets));
  }

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
        tickets.push(...(data as Data).tickets);
        store.dispatch(ticketsAdded(tickets));
        store.dispatch(actions.setLoading(false));
      } else if (data && (data as Data).stop === false) {
        tickets.push(...(data as Data).tickets);
        getTickets();
      } else {
        getTickets();
      }
    };
    getTickets();
  }
};

export default initData;
