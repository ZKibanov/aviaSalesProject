import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card';
import { RootState } from '../../store/store';
import NoTicketsIndicator from '../NoTicketsIndicator';
import { Ticket } from '../types';
import getValueByPath from './getValueByPath';
import sortingWithOptions from './sortingWithOptions';
import classes from './CardList.module.scss';
import ErrorBoundary from '../../hoc/ErrorBoundary';
import * as actions from '../../store/uiReducer/actions';

function CardList(): JSX.Element {
  const dispatch = useDispatch();
  const getMoreTickets = () => dispatch(actions.getMoreTickets());
  const finalArray: JSX.Element[] = [];
  const ticketsQuantity: number = useSelector(
    (state: RootState) => state.ui.renderedTickets
  );

  const { tickets } = useSelector((state: RootState) => state.data);
  const sortingValue: string = useSelector(
    (state: RootState) => state.ui.sorting.filterName
  );

  const sortedArray: Ticket[] = sortingWithOptions(tickets, sortingValue);

  const filtersState = useSelector((state: RootState) => state.ui.filters);
  const filterMatrix = [
    filtersState['Без пересадок'],
    filtersState['1 пересадка'],
    filtersState['2 пересадки'],
    filtersState['3 пересадки'],
  ];

  if (!filterMatrix.includes(true)) return <NoTicketsIndicator />;

  const filteredSortedArray: Ticket[] = [];

  if (sortedArray.length > 0) {
    let j = 0;
    while (
      filteredSortedArray.length < ticketsQuantity &&
      j < sortedArray.length
    ) {
      const matrixNumber: number =
        getValueByPath(sortedArray[j], ['segments', '0', 'stops']).length +
        getValueByPath(sortedArray[j], ['segments', '1', 'stops']).length;

      if (filterMatrix[matrixNumber]) {
        filteredSortedArray.push(sortedArray[j]);
      }
      j += 1;
    }

    for (let i = 0; i < ticketsQuantity; i += 1) {
      if (filteredSortedArray[i]) {
        finalArray.push(
          <ErrorBoundary key={`${i}EB`}>
            <Card key={i} card={filteredSortedArray[i]} />
          </ErrorBoundary>
        );
      }
    }
    if (filteredSortedArray.length === 0) return <NoTicketsIndicator />;
  }

  return (
    <>
      <ul className={classes['ticket-list']}>{finalArray}</ul>
      <button
        key="nav_button-more"
        type="button"
        className={classes['nav__button-more']}
        onClick={getMoreTickets}
      >
        показать еще
      </button>
    </>
  );
}

export default CardList;
