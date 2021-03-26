import { getSortedArray } from './getSortedArray';
import { Ticket } from '../types';

const sortingWithOptions = (
  initialArray: Ticket[],
  sortingValue: string
): Ticket[] => {
  if (sortingValue === 'Самый дешевый') {
    return getSortedArray(initialArray, ['price']);
  }

  if (sortingValue === 'Самый быстрый') {
    const temporaryTicketsArray = [...initialArray].map((ticket) => ({
      ...ticket,
      rating: ticket.segments[0].duration + ticket.segments[1].duration,
    }));
    return getSortedArray(temporaryTicketsArray, ['rating']);
  }

  if (sortingValue === 'Оптимальный') {
    const temporaryTicketsArray = [...initialArray].map((ticket) => ({
      ...ticket,
      rating:
        ticket.price +
        12.5 * (ticket.segments[0].duration + ticket.segments[1].duration),
    }));
    return getSortedArray(temporaryTicketsArray, ['rating']);
  }
  return initialArray;
};

export default sortingWithOptions;
