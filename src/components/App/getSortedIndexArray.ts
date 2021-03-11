import { Ticket, SortResult } from '../types';

export default function getSortedIndexArray(
  list: Ticket[],
  property: string
): SortResult[] {
  type TicketParsingFunction = (obj: Ticket) => number;

  const getPriceValue: TicketParsingFunction = (obj) => obj.price;

  const getDurationValue: TicketParsingFunction = (obj) =>
    obj.segments[0].duration + obj.segments[1].duration;

  const getStopsQuantity: TicketParsingFunction = (obj) =>
    obj.segments[0].stops.length + obj.segments[1].stops.length;

  let mapped: SortResult[] = [];

  if (property === 'price') {
    mapped = list.map((el, i) => ({
      index: i,
      value: getPriceValue(el),
      stops: getStopsQuantity(el),
    }));
  }
  if (property === 'time') {
    mapped = list.map((el, i) => ({
      index: i,
      value: getDurationValue(el),
      stops: getStopsQuantity(el),
    }));
  }

  mapped.sort((a: SortResult, b: SortResult) => {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });

  const result = mapped.map((el: SortResult) => ({
    index: el.index,
    value: el.value,
    stops: el.stops,
  }));

  return result;
}
