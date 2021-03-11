import React from 'react';
import classes from '../App/App.module.scss';
import store from '../../store/store';
import * as actions from '../../store/actionTypes';
import filterBalancer from '../../store/filterBalancer';

function Filters() {
  const filtersState = store.getState().filters;
  const checkboxArray = [];
  const cEvent = (ev: React.ChangeEvent<HTMLInputElement>) => {
    type Filters = {
      Все: boolean;
      'Без пересадок': boolean;
      '1 пересадка': boolean;
      '2 пересадки': boolean;
      '3 пересадки': boolean;
    };

    if (ev.target.labels !== null) {
      const newFilters: Filters = filterBalancer(
        filtersState,
        ev.target.labels[0].textContent,
        ev.target.checked
      );

      store.dispatch({
        type: actions.FILTERS_CHANGED,
        payload: {
          filters: newFilters,
        },
      });
    }
  };

  for (const key in filtersState) {
    if (filtersState[key] === true || filtersState[key] === false) {
      const reactKey: number =
        typeof key[0] === 'number' ? key[0] : key.charCodeAt(0);
      checkboxArray.push(
        <label
          htmlFor={`chBox${key}`}
          key={reactKey}
          className={classes.filter}
        >
          <input
            id={`chBox${key}`}
            className={classes.filter__input}
            type="checkbox"
            checked={filtersState[key]}
            onChange={cEvent}
          />
          <span className={classes.check__box} />
          {key}
        </label>
      );
    }
  }

  return (
    <aside className={classes.filter__container}>
      <h5 className={classes.filter__header}>КОЛИЧЕСТВО ПЕРЕСАДОК</h5>
      {checkboxArray}
    </aside>
  );
}

export default Filters;
