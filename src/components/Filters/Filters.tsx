import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from '../App/App.module.scss';
import { RootState } from '../../store/store';
import * as actions from '../../store/actions';
import filterBalancer from '../../store/filterBalancer';

function Filters() {
  const dispatch = useDispatch();

  const filtersState = useSelector((state: RootState) => state.filters);
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
      dispatch(actions.filtersChanged(newFilters));
    }
  };

  for (const key in filtersState) {
    if (typeof filtersState[key] === 'boolean') {
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
