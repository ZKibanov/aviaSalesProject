import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../Card';
import { RootState } from '../../store/store';
import NoTicketsIndicator from '../NoTicketsIndicator';
import { Ticket, SortResult } from '../types';
import classes from './CardList.module.scss';
import * as actions from '../../store/actions';

function CardList(): JSX.Element {
  const dispatch = useDispatch();
  const getMoreTickets = () => dispatch(actions.getMoreTickets());

  const finalArray = [];
  const ticketsQuantity = useSelector(
    (state: RootState) => state.ui.renderedTickets
  );

  const { tickets } = useSelector((state: RootState) => state.info);
  const sortingValue: string = useSelector(
    (state: RootState) => state.ui.sorting.filterName
  );

  type SortingMatrix = [
    ['timeSorted', 'Самый быстрый'],
    ['priceSorted', 'Самый дешевый'],
    ['optimalSorted', 'Оптимальный']
  ];

  const sortingMatrix: SortingMatrix = [
    ['timeSorted', 'Самый быстрый'],
    ['priceSorted', 'Самый дешевый'],
    ['optimalSorted', 'Оптимальный'],
  ];

  const orderValue = sortingMatrix.filter((el) =>
    el[1] === sortingValue ? el[0] : false
  )[0][0];
  const sortingOrder: SortResult[] = useSelector(
    (state: RootState) => state.info[orderValue]
  );

  const filtersState = useSelector((state: RootState) => state.ui.filters);
  const filterMatrix = [
    filtersState['Без пересадок'],
    filtersState['1 пересадка'],
    filtersState['2 пересадки'],
    filtersState['3 пересадки'],
  ];
  const filteredArray: SortResult[] = [];
  const isLoading = useSelector((state: RootState) => state.ui.isLoading);
  if (
    !filterMatrix.includes(true) ||
    (sortingOrder && sortingOrder.length === 0)
  )
    return isLoading || <NoTicketsIndicator />;
  if (tickets && sortingOrder) {
    let j = 0;
    while (filteredArray.length < ticketsQuantity && sortingOrder[j]) {
      const matrixNumber: number = sortingOrder[j].stops;
      if (filterMatrix[matrixNumber]) {
        filteredArray.push(sortingOrder[j]);
      }
      j += 1;
    }

    if (tickets && filteredArray) {
      for (let i = 0; i < ticketsQuantity; i += 1) {
        if (filteredArray[i]) {
          const ticketIndex: number = filteredArray[i].index;
          const ticket: Ticket = tickets[ticketIndex];
          finalArray.push(<Card key={ticketIndex} card={ticket} />);
        }
      }
    }
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
