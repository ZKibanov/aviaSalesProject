import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card';
import { RootState } from '../../store/store';
import NoTicketsIndicator from '../NoTicketsIndicator';
import { Ticket } from '../types';
import { getValueByPath, getSortedArray } from './getSortedArray';
import classes from './CardList.module.scss';
import * as actions from '../../store/actions';

function CardList(): JSX.Element {
  const dispatch = useDispatch();
  const getMoreTickets = () => dispatch(actions.getMoreTickets());
  const finalArray: JSX.Element[] = [];
  let sortedArray: Ticket[] = [];
  const ticketsQuantity: number = useSelector(
    (state: RootState) => state.ui.renderedTickets
  );

  const { tickets } = useSelector((state: RootState) => state.info);
  const sortingValue: string = useSelector(
    (state: RootState) => state.ui.sorting.filterName
  );
  if (sortingValue === 'Самый дешевый') {
    sortedArray = getSortedArray(tickets, ['price']);
  }

  if (sortingValue === 'Самый быстрый') {
    const temporaryTicketsArray = [...tickets].map((ticket) => ({
      ...ticket,
      rating: ticket.segments[0].duration + ticket.segments[1].duration,
    }));
    sortedArray = getSortedArray(temporaryTicketsArray, ['rating']);
  }

  if (sortingValue === 'Оптимальный') {
    const temporaryTicketsArray = [...tickets].map((ticket) => ({
      ...ticket,
      rating:
        ticket.price +
        12.5 * (ticket.segments[0].duration + ticket.segments[1].duration),
    }));
    sortedArray = getSortedArray(temporaryTicketsArray, ['rating']);
  }

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
        finalArray.push(<Card key={i} card={filteredSortedArray[i]} />);
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
