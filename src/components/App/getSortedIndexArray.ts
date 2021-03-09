import { Ticket, sortResult } from './types';

export default function getSortedIndexArray(
  list: Ticket[],
  property: string[]
): sortResult[] {
  const getValueByPath = (obj: any, path: string[]): any | undefined => {
    let result: any = obj;
    path.forEach((propName: string) => {
      if (result !== undefined && typeof result === 'object') {
        result = result[propName];
      }
    });
    return result;
  };

  const pathToStops1 = ['segments', '0', 'stops'];
  const pathToStops2 = ['segments', '1', 'stops'];

  let mapped: sortResult[] = [];

  if (property[0] === 'price') {
    mapped = list.map(function (el, i) {
      return {
        index: i,
        value: getValueByPath(el, property),
        stops:
          getValueByPath(el, pathToStops1).length +
          getValueByPath(el, pathToStops2).length,
      };
    });
  }
  if (property[0] === 'segments') {
    mapped = list.map(function (el, i) {
      const firstSegmentTime = getValueByPath(el, property);
      const secondSegmentProperty = [...property];
      secondSegmentProperty[1] = '1';
      const secondSegmentTime = getValueByPath(el, secondSegmentProperty);
      return {
        index: i,
        value: firstSegmentTime + secondSegmentTime,
        stops:
          getValueByPath(el, pathToStops1).length +
          getValueByPath(el, pathToStops2).length,
      };
    });
  }

  mapped.sort(function (a: sortResult, b: sortResult) {
    if (a.value > b.value) {
      return 1;
    }
    if (a.value < b.value) {
      return -1;
    }
    return 0;
  });

  const result = mapped.map(function (el: sortResult) {
    return { index: el.index, value: el.value, stops: el.stops };
  });

  return result;
}
