import React, { FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import classes from './Navigation.module.scss';
import { RootState } from '../../store/store';
import * as actions from '../../store/uiReducer/actions';

const Navigation: FC = () => {
  const dispatch = useDispatch();
  const activeButton = useSelector(
    (state: RootState) => state.ui.sorting.filterName
  );
  const cEvent = (ev: React.MouseEvent<HTMLButtonElement>) => {
    if (ev.currentTarget.textContent) {
      const sortingValue = ev.currentTarget.textContent;
      dispatch(actions.setSorting(sortingValue));
    }
  };

  return (
    <nav className={classes.nav}>
      <button
        type="button"
        className={`${classes.nav__button} ${
          activeButton === 'Самый дешевый'
            ? classes['nav__button-active']
            : null
        }`}
        onClick={cEvent}
      >
        Самый дешевый
      </button>
      <button
        type="button"
        className={`${classes.nav__button} ${
          activeButton === 'Самый быстрый'
            ? classes['nav__button-active']
            : null
        }`}
        onClick={cEvent}
      >
        Самый быстрый
      </button>
      <button
        type="button"
        className={`${classes.nav__button} ${
          activeButton === 'Оптимальный' ? classes['nav__button-active'] : null
        }`}
        onClick={cEvent}
      >
        Оптимальный
      </button>
    </nav>
  );
};

export default Navigation;
