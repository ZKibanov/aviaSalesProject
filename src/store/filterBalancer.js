export default function filterBalancer(
  filtersObject,
  filterName,
  newFilterState
) {
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
