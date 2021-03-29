export const getValueByPath = (obj, path) => {
  let result = obj;
  path.forEach((propName) => {
    if (result !== undefined && typeof result === 'object') {
      result = result[propName];
    }
  });
  return result;
};

export function getSortedArray(list, property) {
  const getSortedByPath = (data, path) =>
    data
      .filter((el) => getValueByPath(el, path) !== undefined)
      .sort((a, b) => {
        const aVal = getValueByPath(a, path);
        const bVal = getValueByPath(b, path);
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
      });

  return getSortedByPath(list, property);
}

export const sortingWithOptions = (initialArray, sortingValue) => {
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

export function filterBalancer(filtersObject, newFilterState, filterName) {
  let newFiltersObject = { ...filtersObject, [filterName]: newFilterState };
  if (filterName === 'Все') {
    newFiltersObject =
      newFilterState === true
        ? {
            Все: true,
            'Без пересадок': true,
            '1 пересадка': true,
            '2 пересадки': true,
            '3 пересадки': true,
          }
        : {
            Все: false,
            'Без пересадок': false,
            '1 пересадка': false,
            '2 пересадки': false,
            '3 пересадки': false,
          };
  } else {
    let counter = 0;
    for (const key in newFiltersObject) {
      if (newFiltersObject[key]) {
        counter += newFiltersObject[key];
      }
    }
    if (counter === 4) {
      newFiltersObject['Все'] = newFilterState;
    }
  }

  return newFiltersObject;
}
