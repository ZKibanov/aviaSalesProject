export default function filterBalancer(filtersObject,newFilter,newFilterState) {
    if (newFilter === 'Все' && !!newFilterState) return {
        'Все': true,
        "Без пересадок": true,
        "1 пересадка": true,
        "2 пересадки": true,
        "3 пересадки": true,
    }
    if (newFilter === 'Без пересадок'&& !!newFilterState){
        return {
            'Все': false,
            "Без пересадок": true,
            "1 пересадка": false,
            "2 пересадки": false,
            "3 пересадки": false,
        }
    }
    
    const newFiltersObject = { ...filtersObject }
    newFiltersObject[newFilter] = newFilterState;
    const getActiveFiltersCount = (someObject) =>{
        let counter = 0;
      for (const key in someObject) {
        if (someObject[key].value) counter+=1;
      }
      return counter;
    }

    const activeFilters = getActiveFiltersCount(newFiltersObject);
    console.log(activeFilters);

    return newFiltersObject;

}